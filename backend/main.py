from fastapi import FastAPI
from database import SessionLocal
from models import Student, Company
from schemas import StudentCreate, CompanyCreate
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

@app.get("/companies")
def get_companies():
    db = SessionLocal()

    companies = db.query(Company).all()

    result = []

    for company in companies:
        result.append({
            "company_id": company.company_id,
            "company_name": company.company_name,
            "role": company.role,
            "package": float(company.package),
            "eligibility_cgpa": float(company.eligibility_cgpa),
            "drive_date": str(company.drive_date)
        })

    db.close()

    return result

@app.post("/companies")
def add_company(company: CompanyCreate):
    db = SessionLocal()

    new_company = Company(
        company_name=company.company_name,
        role=company.role,
        package=company.package,
        eligibility_cgpa=company.eligibility_cgpa,
        drive_date=company.drive_date
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    db.close()

    return {"message": "Company added successfully"}

@app.delete("/companies/{company_id}")
def delete_company(company_id: int):
    db = SessionLocal()

    company = db.query(Company).filter(
        Company.company_id == company_id
    ).first()

    if company is None:
        db.close()
        return {"message": "Company not found"}

    db.delete(company)
    db.commit()
    db.close()

    return {"message": "Company deleted successfully"}

@app.put("/companies/{company_id}")
def update_company(company_id: int, updated_company: CompanyCreate):
    db = SessionLocal()

    company = db.query(Company).filter(
        Company.company_id == company_id
    ).first()

    if company is None:
        db.close()
        return {"message": "Company not found"}

    company.company_name = updated_company.company_name
    company.role = updated_company.role
    company.package = updated_company.package
    company.eligibility_cgpa = updated_company.eligibility_cgpa
    company.drive_date = updated_company.drive_date

    db.commit()
    db.close()

    return {"message": "Company updated successfully"}