from fastapi import APIRouter, HTTPException

from api.dependencies import DB_SESSION
from api.models.poll import Poll
from api.schemas.poll import PollCreateSchema, PollResponseSchema, PollUpdateSchema
from api.services.poll import create_poll, update_poll

router = APIRouter(prefix="/poll", tags=["poll"])


@router.get("/{poll_id}")
async def get_poll(poll_id: int, db: DB_SESSION):
    poll = db.get(Poll, poll_id)
    if not poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    return poll.to_pydantic(PollResponseSchema)


@router.post("")
async def create_new_poll(poll: PollCreateSchema, db: DB_SESSION):
    new_poll = create_poll(db, poll)
    return new_poll.to_pydantic(PollResponseSchema)


@router.post("/{poll_id}")
async def update_poll_details(poll_id, poll: PollUpdateSchema, db: DB_SESSION):
    db_poll = db.get(Poll, poll_id)
    if not db_poll:
        raise HTTPException(status_code=404, detail="Poll not found")
    updated_poll = update_poll(db, db_poll, poll)
    return updated_poll.to_pydantic(PollResponseSchema)
