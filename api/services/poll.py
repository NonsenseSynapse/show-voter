from fastapi import HTTPException
from sqlalchemy.orm import Session

from api.models.poll import Poll, PollOption
from api.models.show import Show
from api.schemas.poll import (
    PollCreateSchema,
    PollOptionCreateSchema,
    PollOptionResponseSchema,
    PollOptionUpdateSchema,
    PollResponseSchema,
    PollUpdateSchema,
)


def create_poll(db: Session, poll: PollCreateSchema):
    show = db.get(Show, poll.show_id)
    if not show:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to create poll, show {poll.show_id} does not exist",
        )
    new_poll = Poll(
        description=poll.description, order=poll.order, show_id=poll.show_id
    )
    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)
    return new_poll


def update_poll(db: Session, poll_id: int, poll: PollUpdateSchema):
    existing_poll = db.get(Poll, poll_id)
    if not existing_poll:
        raise HTTPException(status_code=404, detail=f"Poll {poll_id} not found")

    existing_poll.description = poll.description
    existing_poll.order = poll.order
    db.merge(existing_poll)
    db.commit()
    db.refresh(existing_poll)
    return existing_poll


def create_poll_option(db: Session, poll_id, poll_option: PollOptionCreateSchema):
    poll = db.get(Poll, poll_id)
    if not poll:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to add poll option, poll {poll_id} does not exist",
        )
    new_poll_option = PollOption(description=poll_option.description, poll_id=poll_id)
    db.add(new_poll_option)
    db.commit()
    db.refresh(new_poll_option)
    return new_poll_option


def update_poll_option(
    db: Session, poll_id: int, option_id: int, poll_option: PollOptionUpdateSchema
):
    poll = db.get(Poll, poll_id)
    if not poll:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to update poll option, poll {poll_id} does not exist",
        )

    option = db.get(PollOption, option_id)
    if not option:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to update poll option {option_id}, it does not exist",
        )

    if option.poll_id != poll.id:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unable to update poll option {option_id}, for poll {poll_id}. "
                + "This option is not associated with this poll."
            ),
        )

    option.description = poll_option.description
    db.add(option)
    db.commit()
    db.refresh(option)
    return option


def serialize_poll(poll: Poll):
    return PollResponseSchema(
        id=poll.id,
        description=poll.description,
        order=poll.order,
        show_id=poll.show_id,
        date_created=poll.date_created,
        poll_options=[
            poll_option.to_pydantic(PollOptionResponseSchema)
            for poll_option in poll.poll_options
        ],
    )
