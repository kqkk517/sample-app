from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm.session import Session

from . import crud, models, schemas
from .database import get_session

router = APIRouter()


@router.get("/api/v1/todos", response_model=list[schemas.ToDo])
def read_todos(session: Session = Depends(get_session)) -> list[models.ToDo]:
    todos = crud.read_todos(session)

    return todos


@router.get("/api/v1/todos/{id}", response_model=schemas.ToDo)
def read_todo(id: int, session: Session = Depends(get_session)) -> models.ToDo:
    todo = crud.read_todo(id, session)

    return todo


@router.post("/api/v1/todos", response_model=schemas.ToDo)
def create_todo(todo: schemas.ToDo, session: Session = Depends(get_session)) -> models.ToDo:
    text = todo.text
    done = todo.done

    todo = crud.create_todo(text, done, session)

    return todo


@router.put("/api/v1/todos", response_model=schemas.ToDo)
def update_todo(todo: schemas.ToDo, session: Session = Depends(get_session)) -> models.ToDo:
    id = todo.id
    text = todo.text
    done = todo.done

    if id is None:
        raise HTTPException(status_code=400, detail="error")

    todo = crud.update_todo(id, text, done, session)

    return todo


@router.delete("/api/v1/todos/{id}", response_model=schemas.ToDo)
def delete_todo(id: int, session: Session = Depends(get_session)) -> models.ToDo:
    todo = crud.delete_todo(id, session)

    return todo
