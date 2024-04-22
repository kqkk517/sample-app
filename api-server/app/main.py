from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import endpoints

app = FastAPI()

origins = [
    "*",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router)


@app.get("/")
def root() -> Any:
    return {"message": "Hello, world!"}
