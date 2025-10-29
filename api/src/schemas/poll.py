from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class PollOptionCreateSchema(BaseModel):
    description: str


class PollOptionResponseSchema(BaseModel):
    id: int
    description: str
    color: str
    poll_id: int
    is_active: bool
    date_created: datetime
    date_updated: datetime


class PollResponseSchema(BaseModel):
    id: int
    description: str
    order: int
    show_id: int
    is_display: bool
    is_accepting_votes: bool
    date_created: datetime
    poll_options: Optional[List[PollOptionResponseSchema]] = []


class PollCreateSchema(BaseModel):
    show_id: int
    description: str
    order: Optional[int] = 0


class PollOptionUpdateSchema(BaseModel):
    id: Optional[int] = None
    description: str
    is_active: bool
    is_deleted: Optional[bool] = False


class PollUpdateSchema(BaseModel):
    description: str
    poll_options: list[PollOptionUpdateSchema]


class PollAndOptionsCreateSchema(BaseModel):
    show_id: int
    description: str
    order: Optional[int] = 0
    poll_options: Optional[List[PollOptionCreateSchema]] = []


class PollVoteResponseSchema(BaseModel):
    poll_option_id: int
    date_created: datetime


class PollResponseDetailsSchema(PollResponseSchema):
    votes: Optional[List[PollVoteResponseSchema]] = []
