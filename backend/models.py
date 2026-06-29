from sqlalchemy import Column,Integer,String,DECIMAL
from sqlalchemy.orm import declarative_base
Base=declarative_base()
class Student(Base):
    __tablename__="students"
    student_id=Column(Integer,primary_key=True,index=True)
    name=Column(String(100))
    email=Column(String(100),unique=True)
    branch=Column(String(50))
    cgpa=Column(DECIMAL(3.2))
    graduation_year=Column(Integer)
    phone=Column(String(15))