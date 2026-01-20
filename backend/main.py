from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal
from models import Assignment
from schemas import AssignmentCreate

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/assignments", status_code=201)
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db)):
    assignment = Assignment(
        title=data.title,
        description=data.description,
        status="Pending"
    )

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return assignment


@app.get("/api/assignments")
def list_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).all()


@app.get("/api/assignments/{assignment_id}")
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    return assignment

@app.patch("/api/assignments/{assignment_id}")
def update_assignment(assignment_id: int, data: dict, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    if "title" in data:
        assignment.title = data["title"]
    if "description" in data:
        assignment.description = data["description"]
    if "status" in data:
        assignment.status = data["status"]

    db.commit()
    db.refresh(assignment)

    return assignment

@app.delete("/api/assignments/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()

    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()


