from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from src.schemas.poll import PollResponseSchema


class ShowResponseSchema(BaseModel):
    id: int
    title: str
    date_created: datetime
    current_poll_id: int


class ShowResponseDetailsSchema(BaseModel):
    id: int
    title: str
    date_created: datetime
    current_poll_id: int
    polls: Optional[List[PollResponseSchema]] = []


class ShowCreateSchema(BaseModel):
    title: str
