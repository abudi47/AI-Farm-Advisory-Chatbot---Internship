from sqlalchemy import Column, Integer, String
from common.models.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True)
    language = Column(String, default="en")
    location = Column(String)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String)
    is_admin = Column(Integer, default=0)  # <-- This must exist!