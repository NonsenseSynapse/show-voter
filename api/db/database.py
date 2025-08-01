from typing import TypeVar

from pydantic import BaseModel
from sqlalchemy import create_engine, orm
from sqlalchemy.orm import sessionmaker

from api.core.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# TODO: possible delete this. copied from another project but might not need?
BaseModelSubclass = TypeVar("BaseModelSubclass", bound=BaseModel)


class DbBase(orm.DeclarativeBase):
    pass
