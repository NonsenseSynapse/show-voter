from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

from api.db.database import DbBase


class User(DbBase):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    date_created = Column(DateTime, default=func.now())
    username = Column(String)
    password = Column(String)
