from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:Sahaja@localhost:5432/student_placement_tracker"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)