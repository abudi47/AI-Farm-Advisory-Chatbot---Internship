from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat_bot_router
from app.routers import auth
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-farm-advisory-chatbot-internship.vercel.app"
    ],  # Adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI backend is running on Render 🚀"}

app.include_router(chat_bot_router)
# app.include_router(item.router)

app.include_router(auth.router)
