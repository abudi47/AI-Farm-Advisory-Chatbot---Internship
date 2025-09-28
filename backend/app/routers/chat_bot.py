from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import Optional
from sqlalchemy.orm import Session
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
        english_question = await google_translate(request.question, src_lang=request.lang, dest_lang="en")


    # Embed the question
    query_embedding = await single_embed(english_question)
    
    # Retrieve relevant chunks from the database
    result = db.query(Document).order_by(Document.embedding.cosine_distance(query_embedding)).limit(settings.k_retrieval).all()

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
    user language: {lang_map[request.lang]} just to be clear use english for the answer whatever the user language is.

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

