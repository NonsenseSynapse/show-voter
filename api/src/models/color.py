from sqlalchemy import Column, Integer, String
from src.db.database import DbBase


class Color(DbBase):
    __tablename__ = "color"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    hex = Column(String)
[]