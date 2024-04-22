from sqlalchemy import Boolean, Column, Integer, String

from .database import Base


class ToDo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String)
    done = Column(Boolean, default=False)
