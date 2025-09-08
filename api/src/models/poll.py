from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.db.database import DbBase
from src.models.show import Show


class Poll(DbBase):
    __tablename__ = "poll"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    order = Column(Integer)
    date_created = Column(DateTime, default=func.now())

    show_id = Column(Integer, ForeignKey(Show.id))

    show = relationship("Show", back_populates="polls", uselist=False)
    poll_options = relationship("PollOption")
    votes = relationship("Vote")


class PollOption(DbBase):
    __tablename__ = "poll_option"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    date_created = Column(DateTime, default=func.now())
    date_updated = Column(DateTime, default=func.now(), onupdate=func.now())

    poll_id = Column(Integer, ForeignKey(Poll.id))

    poll = relationship("Poll", back_populates="poll_options", uselist=False)
    poll_votes = relationship("PollVote", back_populates="poll_option")


class PollVote(DbBase):
    __tablename__ = "poll_vote"
    id = Column(Integer, primary_key=True, index=True)
    date_created = Column(DateTime, default=func.now())

    poll_id = Column(Integer, ForeignKey(Poll.id))
    poll_option_id = Column(Integer, ForeignKey(PollOption.id))

    poll = relationship("Poll", uselist=False)
    poll_option = relationship("PollOption", back_populates="poll_votes", uselist=False)
