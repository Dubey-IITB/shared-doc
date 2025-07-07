from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud, auth
from app.deps import get_db
from app.auth import get_current_user, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user.username, user.password)

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/document", response_model=schemas.DocumentOut)
def get_document(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    doc = crud.get_document_by_user_id(db, current_user.id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.post("/document", response_model=schemas.DocumentOut)
def save_document(doc_in: schemas.DocumentIn, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    doc = crud.update_document(db, current_user.id, doc_in.content)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc 