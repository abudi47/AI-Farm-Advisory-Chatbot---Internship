import asyncio
import os
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import JSON
from common.config import settings
from common.models.db import SessionLocal
from common.models.document import Document
from .file_reader import document_reader
from .chunk_text import chunk_text
from common.core.openai_client import embed_texts

async def embed_and_store(file_path: str, title: str = None):
    """
    Read a file, generate embeddings, and store them in the database.
    """
    db = SessionLocal()
    
    try:
        text = document_reader(file_path)
        
        if not text:
            print(f"Failed to read or empty content from '{file_path}'.")
            return
        
        filename_with_extension = os.path.basename(file_path)
        
        # check if document embedded previously
        existing_doc = db.query(Document).filter(Document.src_file_name == filename_with_extension).first()
        
        if existing_doc:
            print(f"Document '{file_path}' already embedded. Skipping.")
            return
        
        chunks = chunk_text(text)
        
        if not chunks:
            print("No text chunks generated from the document.")
            return
        
        embeddings = await embed_texts(chunks)
        
        if not embeddings:
            print("No embeddings generated.")
            return
        
        for chunk, embedding in zip(chunks, embeddings):
            doc = Document(
                title=title or os.path.basename(file_path),
                content=chunk,
                doc_metadata={"source": file_path},
                src_file_name=filename_with_extension,
                embedding=embedding,
                status="embedded",
            )
            db.add(doc)
        
        db.commit()
        
        print(f"Committed {len(chunks)} chunks for {file_path}")
    finally:
        db.close()

