from pydantic import BaseModel


class ColorResponseSchema(BaseModel):
    id: int
    name: str
    hex: str
