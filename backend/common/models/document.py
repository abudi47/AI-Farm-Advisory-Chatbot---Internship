from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, func
from pgvector.sqlalchemy import Vector # type: ignore
from common.models.db import Base
from common.config import settings


class Document(Base):
    __tablename__ = 'documents'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    doc_metadata = Column(JSON, nullable=True)
    src_file_name = Column(Text, nullable=False)
    status = Column(String, default="pending")  # <-- Add this line
    size = Column(Integer, default=0)
    # EMBED_DIM is read from config at runtime when creating table
    embedding = Column(Vector(int(settings.embed_dim)), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
