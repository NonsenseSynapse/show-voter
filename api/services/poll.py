from fastapi import HTTPException

from sqlalchemy.orm import Session

from api.models.show import Show
from api.models.poll import Poll
from api.schemas.poll import PollCreateSchema, PollUpdateSchema


def create_poll(db: Session, poll: PollCreateSchema):
    show = db.get(Show, poll.show_id)
    if not show:
        raise HTTPException(status_code=404, 
                            detail=f"Unable to create poll, show {poll.show_id} does not exist")
    new_poll = Poll(description=poll.description, order=poll.order, show_id=poll.show_id)
    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)
    return new_poll


def update_poll(db: Session, existing_poll: Poll, poll: PollUpdateSchema):
    existing_poll.description = poll.description
    existing_poll.order = poll.order
    db.merge(existing_poll)
    db.commit()
    db.refresh(existing_poll)
    return existing_poll
