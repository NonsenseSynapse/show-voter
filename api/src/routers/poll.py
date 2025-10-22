from fastapi import APIRouter, HTTPException, Request
from src.core.dependencies import DB_SESSION
from src.models.poll import Poll
from src.schemas.poll import (
    PollCreateSchema,
    PollOptionCreateSchema,
    PollOptionResponseSchema,
    PollResponseSchema,
    PollUpdateSchema,
)
from src.schemas.vote import VoteCreateSchema, VoteResponseSchema
from src.services.poll import (
    activate_display_poll,
    create_poll,
    create_poll_option,
    serialize_poll,
    update_poll,
    update_poll_option,
)
from src.services.vote import create_vote

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


@router.post("/{poll_id}/display")
async def display_poll(poll_id, db: DB_SESSION):
    updated_poll = activate_display_poll(db, poll_id)
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


@router.post("/{poll_id}/option/{option_id}/vote")
async def poll_vote(poll_id: int, option_id: int, db: DB_SESSION, request: Request):
    poll = db.get(Poll, poll_id)
    new_vote = create_vote(
        db,
        VoteCreateSchema(
            show_id=poll.show_id, poll_id=poll_id, poll_option_id=option_id
        ),
        user_ip=request.client.host
    )

    return new_vote.to_pydantic(VoteResponseSchema)
