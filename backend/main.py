from fastapi import FastAPI
from database import SessionLocal
from models import Student
from schemas import StudentCreate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/students")
def get_students():
    db = SessionLocal()

    students = db.query(Student).all()

    result = []

    for student in students:
        result.append({
            "student_id": student.student_id,
            "name": student.name,
            "email": student.email,
            "branch": student.branch,
            "cgpa": float(student.cgpa),
            "graduation_year": student.graduation_year,
            "phone": student.phone
        })

    db.close()

    return result


@app.post("/students")
def create_student(student: StudentCreate):
    db = SessionLocal()

    new_student = Student(
        name=student.name,
        email=student.email,
        branch=student.branch,
        cgpa=student.cgpa,
        graduation_year=student.graduation_year,
        phone=student.phone
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    db.close()

    return {
        "message": "Student added successfully",
        "student_id": new_student.student_id
    }

@app.put("/students/{student_id}")
def update_student(student_id: int, student: StudentCreate):
    db = SessionLocal()

    existing_student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if existing_student is None:
        db.close()
        return {"message": "Student not found"}

    existing_student.name = student.name
    existing_student.email = student.email
    existing_student.branch = student.branch
    existing_student.cgpa = student.cgpa
    existing_student.graduation_year = student.graduation_year
    existing_student.phone = student.phone

    db.commit()
    db.refresh(existing_student)

    db.close()

    return {"message": "Student updated successfully"}

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    db = SessionLocal()

    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    if student is None:
        db.close()
        return {"message": "Student not found"}

    db.delete(student)
    db.commit()

    db.close()

    return {"message": "Student deleted successfully"}