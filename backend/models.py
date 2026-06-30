from sqlalchemy import Column, Integer, String, DECIMAL, Date, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    branch = Column(String(50))
    cgpa = Column(DECIMAL(3, 2))  # e.g., 9.25
    graduation_year = Column(Integer)
    phone = Column(String(15))

    # Relationship to placements
    placements = relationship("Placement", back_populates="student")


class Company(Base):
    __tablename__ = "companies"

    company_id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(100))
    role = Column(String(100))
    package = Column(DECIMAL(10, 2))  # e.g., 1200000.50
    eligibility_cgpa = Column(DECIMAL(3, 2))
    drive_date = Column(Date)

    # Relationship to placements
    placements = relationship("Placement", back_populates="company")


class Placement(Base):
    __tablename__ = "placements"  # ✅ unique table name

    placement_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    company_id = Column(Integer, ForeignKey("companies.company_id"))
    placement_status = Column(String(50))  # e.g., "Selected", "Rejected"
    placement_date = Column(Date)

    # Relationships
    student = relationship("Student", back_populates="placements")
    company = relationship("Company", back_populates="placements")



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True)
    password = Column(String(200))
    role = Column(String(20))  # admin or student