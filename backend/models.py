from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(20), default="Pending")
    created_time = Column(DateTime)
    updated_time = Column(DateTime)
