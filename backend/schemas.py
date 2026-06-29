from pydantic import BaseModel
class StudentCreate(BaseModel):
    name: str
    email: str
    branch: str
    cgpa: float
    graduation_year:int
    phone: str