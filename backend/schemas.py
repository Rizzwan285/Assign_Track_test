from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "Pending"

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class AssignmentResponse(AssignmentBase):
    id: int
    created_time: datetime
    updated_time: datetime

    model_config = ConfigDict(from_attributes=True)
