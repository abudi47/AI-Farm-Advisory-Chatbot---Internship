from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat_bot_router
from app.routers import auth
from common.config import settings
from sqlalchemy import text
from common.models.db import engine
app = FastAPI()


def _parse_cors_origins(value: str) -> list[str]:
    raw = (value or "").strip()
    if not raw or raw == "*":
        return ["*"]
    return [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]


cors_origins = _parse_cors_origins(settings.cors_origins)
cors_origin_regex = (settings.cors_origin_regex or "").strip() or None


app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=cors_origin_regex,
    # NOTE: Browsers disallow `Access-Control-Allow-Origin: *` when credentials are allowed.
    # This app uses Bearer tokens (Authorization header) rather than cookies, so keep this False.
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI backend is running on Render 🚀"}


@app.get("/health")
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "ok"}
    except Exception as e:
        return {"status": "degraded", "database": "unavailable", "detail": str(e)}

app.include_router(chat_bot_router)
# app.include_router(item.router)

app.include_router(auth.router)
