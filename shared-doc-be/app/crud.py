from sqlalchemy.orm import Session
from app import models
from passlib.context import CryptContext
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, username: str, password: str):
    hashed_password = get_password_hash(password)
    user = models.User(username=username, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    # Create a default document for the user
    doc = models.Document(title="My First Document", content="", owner_id=user.id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def get_documents_by_user_id(db: Session, user_id: int):
    return db.query(models.Document).filter(models.Document.owner_id == user_id).order_by(models.Document.updated_at.desc()).all()

def get_document_by_id(db: Session, document_id: int, user_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id, models.Document.owner_id == user_id).first()

def create_document(db: Session, user_id: int, title: str):
    doc = models.Document(title=title, content="", owner_id=user_id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def update_document(db: Session, document_id: int, user_id: int, title: str, content: str):
    doc = get_document_by_id(db, document_id, user_id)
    if doc:
        doc.title = title
        doc.content = content
        doc.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(doc)
    return doc

def delete_document(db: Session, document_id: int, user_id: int):
    doc = get_document_by_id(db, document_id, user_id)
    if doc:
        db.delete(doc)
        db.commit()
        return True
    return False 