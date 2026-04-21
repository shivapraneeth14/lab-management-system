from pydantic import BaseModel
from datetime import date

class ReportCreate(BaseModel):
    patient_id: int
    report_type: str
    report_date: date
    result_value: float
    unit: str
    min_range: float
    max_range: float