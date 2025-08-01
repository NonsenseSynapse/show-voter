from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func

from api.db.database import DbBase


class Show(DbBase):
    __tablename__ = "show"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    date_created = Column(DateTime, default=func.now())

    current_poll_id = Column(Integer)
