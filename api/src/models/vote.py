from sqlalchemy import Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.db.database import DbBase
from src.models.poll import Poll, PollOption
from src.models.show import Show


class Vote(DbBase):
    __tablename__ = "vote"
    id = Column(Integer, primary_key=True, index=True)
    show_id = Column(Integer, ForeignKey(Show.id))
    poll_id = Column(Integer, ForeignKey(Poll.id))
    poll_option_id = Column(Integer, ForeignKey(PollOption.id))
    date_created = Column(DateTime, default=func.now())

    poll = relationship("Poll", back_populates="votes", uselist=False)
