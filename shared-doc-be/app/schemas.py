from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class DocumentIn(BaseModel):
    content: str

class DocumentOut(BaseModel):
    id: int
    content: str
    class Config:
        from_attributes = True 