from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    report_type = Column(String)
    report_date = Column(Date)
    result_value = Column(Float)
    unit = Column(String)
    min_range = Column(Float)
    max_range = Column(Float)
    status = Column(String)
    file_path = Column(String)