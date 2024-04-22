from typing import Generator

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

url = "postgresql://postgres:postgres@database:5432/postgres"

engine = create_engine(url, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_session() -> Generator:
    session = None

    try:
        session = SessionLocal()
        yield session

    except Exception as e:
        if session:
            session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        session.close()
