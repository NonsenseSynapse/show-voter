from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models.vote import Vote
from src.schemas.vote import VoteCreateSchema
from src.models.show import Show
from src.models.poll import Poll
)


def create_vote(db: Session, vote: VoteCreateSchema) -> Vote:
    new_vote = Vote(show_id=vote.show_id, poll_id=vote.poll_id, poll_option_id=vote.poll_option_id)
    
    db.add(new_vote)
    db.commit()
    db.refresh(new_vote)
    return new_vote