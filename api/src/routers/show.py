from fastapi import APIRouter, HTTPException
from src.core.dependencies import DB_SESSION
from src.models.show import Show
from src.schemas.poll import PollAndOptionsCreateSchema
from src.schemas.show import ShowCreateSchema, ShowResponseSchema
from src.services.show import create_show, serialize_show_details, update_show

router = APIRouter(prefix="/show", tags=["show"])


@router.get("/{show_id}")
async def get_show(show_id: int, db: DB_SESSION):
    show = db.get(Show, show_id)
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    return serialize_show_details(show)


@router.post("")
async def create_new_show(show: ShowCreateSchema, db: DB_SESSION):
    new_show = create_show(db, show)
    return new_show.to_pydantic(ShowResponseSchema)


@router.post("/{show_id}")
async def update_show_details(show_id, show: ShowCreateSchema, db: DB_SESSION):
    db_show = db.get(Show, show_id)
    if not db_show:
        raise HTTPException(status_code=404, detail="Show not found")
    updated_show = update_show(db, db_show, show)
    return updated_show.to_pydantic(ShowResponseSchema)


@router.post("/{show_id}/poll/create")
async def create_poll(
    show_id, poll_and_options: PollAndOptionsCreateSchema, db: DB_SESSION
):
    db_show = db.get(Show, show_id)
    if not db_show:
        raise HTTPException(status_code=404, detail="Show not found")

    updated_show = update_show(db, db_show, show)
    return updated_show.to_pydantic(ShowResponseSchema)
