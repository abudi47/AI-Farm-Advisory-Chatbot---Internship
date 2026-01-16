from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from common.config import get_database_url
import warnings

DATABASE_URL = get_database_url()

if not DATABASE_URL:
    warnings.warn(
        "Database URL is not configured. Set DATABASE_URL or DATABASE_USER/DATABASE_PASSWORD/DATABASE_HOST/DATABASE_NAME. "
        "Database features will be unavailable.",
        stacklevel=2,
    )
    engine = None
    SessionLocal = None
else:
    # Use pool_pre_ping to detect stale connections, and don't fail at import time
    engine = create_engine(DATABASE_URL, echo=False, future=True, pool_pre_ping=True)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


def get_db():
    if SessionLocal is None:
        raise RuntimeError(
            "Database is not configured. Please set DATABASE_URL or the component variables "
            "(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME)."
        )
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
