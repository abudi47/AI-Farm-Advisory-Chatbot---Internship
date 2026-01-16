from sqlalchemy import text
from .document import Document
from .user import User
from .db import Base, engine

def init_db():
    """
    Initialize the database by creating all tables and necessary extensions.
    """
    if engine is None:
        raise RuntimeError(
            "Cannot initialize database: DATABASE_URL is not configured. "
            "Set DATABASE_URL or the component variables (DATABASE_USER, DATABASE_PASSWORD, etc.)"
        )
    
    with engine.connect() as conn:
        # install pgvector extension if not exists
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
        conn.commit()

    Base.metadata.create_all(bind=engine)
    print("DB initialization completed successfully")

if __name__ == "__main__":
    init_db()
    print("DB initialization completed successfully")
