from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class PollResponseSchema(BaseModel):
    id: int
    description: str
    order: int
    show_id: int
    date_created: datetime

class PollCreateSchema(BaseModel):
    show_id: int
    description: str
    order: Optional[int] = 0

class PollUpdateSchema(BaseModel):
    description: str
    order: Optional[int] = 0

