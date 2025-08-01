from typing import Annotated
from api.db.database import SessionLocal
from fastapi import Depends
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DB_SESSION = Annotated[Session, Depends(get_db)]