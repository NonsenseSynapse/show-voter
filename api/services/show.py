from sqlalchemy.orm import Session

from api.models.show import Show
from api.schemas.show import ShowCreateSchema


def create_show(db: Session, show: ShowCreateSchema):
    new_show = Show(title=show.title, current_poll_id=0)
    db.add(new_show)
    db.commit()
    db.refresh(new_show)
    return new_show


def update_show(db: Session, existing_show: Show, show: ShowCreateSchema):
    existing_show.title = show.title
    db.merge(existing_show)
    db.commit()
    db.refresh(existing_show)
    return existing_show
