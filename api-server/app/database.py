import os
from typing import Generator

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 環境変数から接続先DBのURLを取得する
database_url = os.getenv("DATABASE_URL")

# DBとのセッションオブジェクトのファクトリクラスを作成する
engine = create_engine(database_url, echo=False)
SessionMaker = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# すべてのモデルの基底クラスを作成する
Base = declarative_base()


def get_session() -> Generator:
    """DBとのセッションオブジェクトを作成、管理する
    Returns:
        Generator: DBとのセッションオブジェクト
    """

    session = None

    try:
        session = SessionMaker()
        yield session

    except Exception as e:
        if session:
            session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        session.close()
