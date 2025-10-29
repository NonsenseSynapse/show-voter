from fastapi import APIRouter
from src.core.dependencies import DB_SESSION
from src.models.color import Color
from src.schemas.color import ColorResponseSchema

router = APIRouter(prefix="/color", tags=["color"])


@router.get("")
async def get_all_colors(db: DB_SESSION):
    colors = db.query(Color).all()
    return [color.to_pydantic(ColorResponseSchema) for color in colors]
