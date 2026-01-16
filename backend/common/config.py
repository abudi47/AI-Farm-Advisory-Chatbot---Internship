from pydantic_settings import BaseSettings, SettingsConfigDict # type: ignore
from urllib.parse import quote

class Settings(BaseSettings):
    openai_api_key: str = ""
    openweather_api_key: str = ""
    telegram_bot_token: str = ""
    gen_model: str = "gpt-4o-mini"
    embedding_model: str = "text-embedding-3-small"
    embed_dim: int = 1536
    # Database
    # Prefer DATABASE_URL if set. Otherwise construct from the components below.
    database_url: str = ""
    database_user: str = ""
    database_password: str = ""
    database_host: str = ""
    database_port: int = 5432
    database_name: str = ""
    database_sslmode: str = ""  # e.g. "require"
    k_retrieval: int = 5

    # CORS
    # Use "*" for local/dev if you are not using cookies.
    # For production, set a comma-separated list of allowed origins.
    cors_origins: str = "*"
    # Optional regex for preview domains (e.g. Vercel previews)
    cors_origin_regex: str = ""
    
    allowed_file_types: list = [".pdf"]

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )
    supported_languages: dict = {
        "en": "English",
        "am": "Amharic",
        "om": "Affan Oromo",
        "so": "Somali",
        "ti": "Tigrinya"
    }

settings = Settings()


def get_database_url() -> str:
    url = (settings.database_url or "").strip()
    if url:
        return url

    user = (settings.database_user or "").strip()
    password = (settings.database_password or "").strip()
    host = (settings.database_host or "").strip()
    name = (settings.database_name or "").strip()

    if not (user and password and host and name):
        return ""

    user_enc = quote(user, safe="")
    password_enc = quote(password, safe="")
    base = f"postgresql+psycopg2://{user_enc}:{password_enc}@{host}:{settings.database_port}/{name}"
    if settings.database_sslmode:
        return base + f"?sslmode={quote(settings.database_sslmode, safe='')}"
    return base
