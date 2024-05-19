from fastapi import HTTPException
from sqlalchemy import asc
from sqlalchemy.orm.session import Session

from . import models


def read_todos(session: Session) -> list[models.ToDo]:
    try:
        todos = session.query(models.ToDo).order_by(asc(models.ToDo.id)).all()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return todos


def read_todo(id: int, session: Session) -> models.ToDo:
    try:
        todo = session.query(models.ToDo).filter(models.ToDo.id == id).first()

        if todo is None:
            raise HTTPException(status_code=404, detail="ToDo not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return todo


def create_todo(text: str, done: bool, session: Session) -> models.ToDo:
    todo = models.ToDo(text=text, done=done)

    try:
        session.add(todo)
        session.commit()
        session.refresh(todo)

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return todo


def update_todo(id: int, text: str, done: bool, session: Session) -> models.ToDo:
    try:
        todo = session.query(models.ToDo).filter(models.ToDo.id == id).first()

        if todo is None:
            raise HTTPException(status_code=404, detail="ToDo not found")

        todo.text = text
        todo.done = done

        session.commit()
        session.refresh(todo)

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return todo


def delete_todo(id: int, session: Session) -> models.ToDo:
    try:
        todo = session.query(models.ToDo).filter(models.ToDo.id == id).first()

        if todo is None:
            raise HTTPException(status_code=404, detail="ToDo not found")

        session.delete(todo)
        session.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return todo
