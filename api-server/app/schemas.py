from typing import Optional

from pydantic import BaseModel
from pydantic.alias_generators import to_camel


class ToDo(BaseModel):
    id: Optional[int] = None
    text: str
    done: bool

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True
