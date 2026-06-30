from pydantic import BaseModel
from datetime import date

class StudentCreate(BaseModel):
    name: str
    email: str
    branch: str
    cgpa: float
    graduation_year:int
    phone: str

class CompanyCreate(BaseModel):
    company_name: str
    role: str
    package: float
    eligibility_cgpa: float
    drive_date: date