from sqlalchemy import Column, DateTime, Integer, String, ForeignKey
from api.db.database import DbBase
from sqlalchemy.sql import func

class User(DbBase):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
