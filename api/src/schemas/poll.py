from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class PollOptionCreateSchema(BaseModel):
    description: str


class PollOptionUpdateSchema(BaseModel):
    description: str


class PollOptionResponseSchema(BaseModel):
    id: int
    description: str
    poll_id: int
    date_created: datetime
    date_updated: datetime


class PollResponseSchema(BaseModel):
    id: int
    description: str
    order: int
    show_id: int
    date_created: datetime
    poll_options: Optional[List[PollOptionResponseSchema]] = []


class PollCreateSchema(BaseModel):
    show_id: int
    description: str
    order: Optional[int] = 0


class PollUpdateSchema(BaseModel):
    description: str
    order: Optional[int] = 0


class PollAndOptionsCreateSchema(BaseModel):
    show_id: int
    description: str
    order: Optional[int] = 0
    poll_options: Optional[List[PollOptionCreateSchema]] = []
