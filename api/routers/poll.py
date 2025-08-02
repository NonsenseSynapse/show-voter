from fastapi import APIRouter, HTTPException

from api.dependencies import DB_SESSION
from api.models.poll import Poll
from api.schemas.poll import (
    PollCreateSchema,
    PollOptionCreateSchema,
    PollOptionResponseSchema,
    PollResponseSchema,
    PollUpdateSchema,
)
from api.services.poll import (
    create_poll,
    create_poll_option,
    serialize_poll,
    update_poll,
    update_poll_option,
)

router = APIRouter(prefix="/poll", tags=["poll"])


@router.get("/{poll_id}")
async def get_poll(poll_id: int, db: DB_SESSION):
    poll = db.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    return serialize_poll(poll)


@router.post("")
async def create_new_poll(poll: PollCreateSchema, db: DB_SESSION):
    new_poll = create_poll(db, poll)
    return new_poll.to_pydantic(PollResponseSchema)


@router.post("/{poll_id}")
async def update_poll_details(poll_id, poll_option: PollUpdateSchema, db: DB_SESSION):
    updated_poll = update_poll(db, poll_id, poll_option)
    return serialize_poll(updated_poll)


@router.post("/{poll_id}/option")
async def create_new_poll_option(
    poll_id: int, poll_option: PollOptionCreateSchema, db: DB_SESSION
):
    new_poll_option = create_poll_option(db, poll_id, poll_option)
    return new_poll_option.to_pydantic(PollOptionResponseSchema)


@router.post("/{poll_id}/option/{option_id}")
async def update_poll_option_details(
    poll_id: int, option_id: int, poll_option: PollUpdateSchema, db: DB_SESSION
):
    updated_poll_option = update_poll_option(db, poll_id, option_id, poll_option)
    return updated_poll_option.to_pydantic(PollOptionResponseSchema)
