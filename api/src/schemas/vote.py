from datetime import datetime

from pydantic import BaseModel


class VoteCreateSchema(BaseModel):
    show_id: int
    poll_id: int
    poll_option_id: int


class VoteResponseSchema(BaseModel):
    show_id: int
    poll_id: int
    poll_option_id: int
    date_created: datetime
