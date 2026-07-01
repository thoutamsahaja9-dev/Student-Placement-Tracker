from fastapi import FastAPI
from database import SessionLocal
from models import Student, Company, Placement
from schemas import StudentCreate, CompanyCreate, PlacementCreate
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi import Query

@app.get("/students")
def get_students(search: str = Query(default="")):
    db = SessionLocal()

    if search:
        students = db.query(Student).filter(
            Student.name.ilike(f"%{search}%")
        ).all()
    else:
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
            "phone": student.phone,
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

@app.get("/placements")
def get_placements():
    db = SessionLocal()

    placements = db.query(Placement).all()

    result = []

    for p in placements:
        result.append({
            "placement_id": p.placement_id,
            "student_id": p.student_id,
            "student_name": p.student.name,
            "company_id": p.company_id,
            "company_name": p.company.company_name,
            "placement_status": p.placement_status,
            "placement_date": str(p.placement_date)
        })

    db.close()
    return result

@app.post("/placements")
def add_placement(placement: PlacementCreate):
    db = SessionLocal()

    student = db.query(Student).filter(
        Student.student_id == placement.student_id
    ).first()

    if student is None:
        db.close()
        return {"message": "Student not found"}

    company = db.query(Company).filter(
        Company.company_id == placement.company_id
    ).first()

    if company is None:
        db.close()
        return {"message": "Company not found"}

    new_placement = Placement(
        student_id=placement.student_id,
        company_id=placement.company_id,
        placement_status=placement.placement_status,
        placement_date=placement.placement_date
    )

    db.add(new_placement)
    db.commit()
    db.refresh(new_placement)

    db.close()

    return {
        "message": "Placement added successfully"
    }

@app.get("/stats/students")
def total_students():
    db = SessionLocal()
    count = db.query(Student).count()
    db.close()
    return {"total_students": count}

@app.get("/stats/companies")
def total_companies():
    db = SessionLocal()
    count = db.query(Company).count()
    db.close()
    return {"total_companies": count}

@app.get("/stats/placements")
def total_placements():
    db = SessionLocal()
    count = db.query(Placement).count()
    db.close()
    return {"total_placements": count}

@app.get("/stats/placement-rate")
def placement_rate():
    db = SessionLocal()

    total_students = db.query(Student).count()
    placed_students = db.query(Placement.student_id).distinct().count()

    db.close()

    rate = (placed_students / total_students * 100) if total_students > 0 else 0

    return {"placement_rate": round(rate, 2)}

@app.delete("/placements/{placement_id}")
def delete_placement(placement_id: int):
    db = SessionLocal()

    placement = db.query(Placement).filter(
        Placement.placement_id == placement_id
    ).first()

    if placement:
        db.delete(placement)
        db.commit()

    db.close()

    return {"message": "Placement deleted successfully"}