from datetime import datetime

from pydantic import BaseModel


class ShowResponseSchema(BaseModel):
    id: int
    title: str
    date_created: datetime
    current_poll_id: int


class ShowCreateSchema(BaseModel):
    title: str
