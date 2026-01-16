from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from common.models.db import get_db
from common.models.document import Document
from common.config import settings
from common.core.openai_client import single_embed, chat_completion
from common.core.openweather import get_weather
from common.core.googletrans import translate as google_translate, detect_language

router = APIRouter()

class AskRequest(BaseModel):
    question: str = Field(..., min_length=2, max_length=200, example="What is the best fertilizer for tomatoes?")
    lang: str = Field("en", pattern="^(auto|en|am|om|so|ti)$")  # optional
    location: Optional[str] = Field("", example="Addis Ababa")  # optional
    latitude: Optional[float] = Field(None, example=9.03)  # optional
    longitude: Optional[float] = Field(None, example=38.74)  # optional

class AskResponse(BaseModel):
    answer: str
    sources: list
    
lang_map = {
    "auto": "Auto",
    "en": "English",
    "am": "Amharic",
    "om": "Affan Oromo",
    "so": "Somali",
    "ti": "Tigrinya"
}

def clean_text(text: str) -> str:
    """
    Optionally, remove unwanted characters like stars (for bolding)
    """
    text = text.replace("**", "")
    text = text.replace(">>>>", "")
    # Add more cleaning logic as needed
    return text


@router.post("/ask", response_model=AskResponse)
async def ask_question(request: AskRequest, db: Session = Depends(get_db)):
    """
        Handle user questions and return answers.
        - request: AskRequest
        - db: Database session
    """
     
    english_question = request.question
    question_lang = await detect_language(english_question)
    
    if question_lang != "en":
        src_lang = request.lang if request.lang != "auto" else question_lang
        english_question = await google_translate(request.question, src_lang=src_lang, dest_lang="en")

    # Handle greetings and simple interactions without database query
    question_lower = english_question.lower().strip()
    greeting_patterns = [
        "hi", "hello", "hey", "greetings", "good morning", "good afternoon", 
        "good evening", "howdy", "hola", "salut", "namaste",
        "how are you", "how r u", "how do you do", "what's up", "whats up",
        "sup", "wassup", "how's it going", "hows it going"
    ]
    intro_patterns = [
        "who are you", "what are you", "who am i talking to", "what is your name",
        "introduce yourself", "tell me about yourself"
    ]
    thanks_patterns = ["thank", "thanks", "thx", "appreciate"]
    
    # Check for greetings
    if any(pattern in question_lower for pattern in greeting_patterns) and len(question_lower.split()) <= 5:
        greeting_response = (
            "Hello! I'm Nile Care AI Farm Advisory, your agricultural assistant. "
            "I'm here to help answer your farming questions, provide crop advice, "
            "discuss pest management, soil health, weather impacts, and more. "
            "How can I assist you today?"
        )
        if request.lang != "en" and question_lang != "en":
            greeting_response = await google_translate(greeting_response, src_lang="en", dest_lang=question_lang)
        return AskResponse(answer=greeting_response, sources=[])
    
    # Check for introductions
    if any(pattern in question_lower for pattern in intro_patterns):
        intro_response = (
            "I am Nile Care AI Farm Advisory, your trusted agricultural assistant. "
            "I'm designed to help farmers and agricultural professionals with farming-related queries, "
            "provide guidance on crop management, pest control, soil health, weather conditions, "
            "and offer tailored advice based on agricultural best practices. "
            "What would you like to know about farming?"
        )
        if request.lang != "en" and question_lang != "en":
            intro_response = await google_translate(intro_response, src_lang="en", dest_lang=question_lang)
        return AskResponse(answer=intro_response, sources=[])
    
    # Check for thanks
    if any(pattern in question_lower for pattern in thanks_patterns) and len(question_lower.split()) <= 5:
        thanks_response = "You're welcome! Feel free to ask me anything about farming and agriculture."
        if request.lang != "en" and question_lang != "en":
            thanks_response = await google_translate(thanks_response, src_lang="en", dest_lang=question_lang)
        return AskResponse(answer=thanks_response, sources=[])

    # Embed the question
    query_embedding = await single_embed(english_question)
    
    # Retrieve relevant chunks from the database
    try:
        result = (
            db.query(Document)
            .order_by(Document.embedding.cosine_distance(query_embedding))
            .limit(settings.k_retrieval)
            .all()
        )
    except SQLAlchemyError as e:
        # Check if this is a connection error (IPv6, network, auth, etc.)
        root_err = getattr(e, "orig", e)
        err_msg = str(root_err).lower()
        
        if "network is unreachable" in err_msg or "connection" in err_msg:
            raise HTTPException(
                status_code=503,
                detail=(
                    "Unable to connect to the database. This may be due to network issues, "
                    "IPv6 connectivity problems, or incorrect database credentials. "
                    "For local development, consider setting up a local PostgreSQL instance. "
                    "For Supabase, use the Connection Pooler host instead of the direct database host."
                ),
            ) from e
        else:
            raise HTTPException(
                status_code=503,
                detail=f"Database error: {str(root_err)[:200]}",
            ) from e

    context = "\n\n".join([doc.content for doc in result])
    if not context.strip():
        return AskResponse(answer="I'm sorry, I don't have enough information to answer that question.", sources=[])


    weather_data = None
    if request.location:
        weather_data = await get_weather(request.location)
        context += f"\n\nWeather information for {request.location}:\n{weather_data}"
    
    if request.latitude and request.longitude:
        weather_data = await get_weather("", lat=request.latitude, lon=request.longitude)
        context += f"\n\nWeather information for coordinates ({request.latitude}, {request.longitude}):\n{weather_data}"

    # Build prompt for answering
    system_prompt = (
        "You are Nile Care AI Farm Advisory, a specialized agricultural assistant. Your role is to provide concise, clear, "
        "and informative answers based solely on the context provided. Always answer in the language requested, without "
        "introducing any other languages. If the question cannot be answered from the provided context, acknowledge this by "
        "saying, 'I don't know.'\n\n"
        
        "- **Weather inquiries**: If asked for the weather, offer a concise, accurate report based only on the available data. "
        "Do not add extra commentary or suggestions.\n\n"
        
        "- **Tone & Clarity**: Your responses should be professional, easy to understand, and accurate. If the context includes "
        "technical terms or complex concepts, simplify them for the user’s understanding while maintaining accuracy.\n\n"
        
        "- **Consistency & Transparency**: If you're unsure about something, communicate that clearly and refrain from guessing. "
        "Always prioritize honesty in your responses.\n\n"
        
        "If the user greets you (e.g., 'Hi', 'Hello', 'Good morning'), respond in a friendly, human-like manner, such as:\n"
        "'Hello! How can I assist you with your farming needs today?' or 'Hi there! How can I help with your agricultural questions?'"
        
        # Add a response for identifying the assistant
        "If asked 'Who am I talking to?' or something similar, you should respond with: 'You are talking to Nile Care AI Farm Advisory, "
        "your trusted agricultural assistant designed to help with farming-related queries and provide tailored guidance based on provided data.'"
        
        "Don't include any list just return the answer in a paragraph format."
    )
    
    prompt = f"""Use the following context to answer the

    question: {english_question}
    user language: {lang_map.get(request.lang, 'English')} just to be clear use english for the answer whatever the user language is.

    Context:
    {context}
    Weather Data:
    {weather_data if weather_data else 'No weather data provided.'}
    """

    answer = await chat_completion(system_prompt, [{"role":"user","content":prompt}], max_tokens=512)
    
    answer = clean_text(answer)
    
    if request.lang != "en" or question_lang != "en":
        answer = await google_translate(answer, src_lang="en", dest_lang=question_lang or "en")
    
    # print("Question:", english_question)
    # print("Context:", context)
    # print("Weather info:", weather_data)
    # print("Answer:", answer)    

    sources = ["source1", "source2"]
    return AskResponse(answer=answer, sources=sources)

