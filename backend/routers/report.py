from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.report import Report
import shutil
import uuid
import os
from datetime import date

router = APIRouter()

# 🔥 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔥 CREATE REPORT (WITH FILE UPLOAD)
@router.post("/reports")
async def create_report(
    patient_id: int = Form(...),
    report_type: str = Form(...),
    report_date: date = Form(...),
    result_value: float = Form(...),
    unit: str = Form(...),
    min_range: float = Form(...),
    max_range: float = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # 🔥 CREATE uploads folder if not exists
    os.makedirs("uploads", exist_ok=True)

    # 🔥 Generate unique filename
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = f"uploads/{filename}"

    # 🔥 Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 🔥 Determine status
    if result_value < min_range or result_value > max_range:
        status = "Abnormal"
    else:
        status = "Normal"

    # 🔥 Save to DB
    new_report = Report(
        patient_id=patient_id,
        report_type=report_type,
        report_date=report_date,
        result_value=result_value,
        unit=unit,
        min_range=min_range,
        max_range=max_range,
        status=status,
        file_path=file_path
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


# 🔥 GET ALL REPORTS
@router.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()


# 🔥 UPDATE REPORT
@router.put("/reports/{id}")
def update_report(
    id: int,
    patient_id: int = Form(...),
    report_type: str = Form(...),
    report_date: date = Form(...),
    result_value: float = Form(...),
    unit: str = Form(...),
    min_range: float = Form(...),
    max_range: float = Form(...),
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(Report.id == id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    # 🔥 Update fields
    report.patient_id = patient_id
    report.report_type = report_type
    report.report_date = report_date
    report.result_value = result_value
    report.unit = unit
    report.min_range = min_range
    report.max_range = max_range

    # 🔥 Recalculate status
    if result_value < min_range or result_value > max_range:
        report.status = "Abnormal"
    else:
        report.status = "Normal"

    db.commit()
    db.refresh(report)

    return report


# 🔥 DELETE REPORT
@router.delete("/reports/{id}")
def delete_report(id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    db.delete(report)
    db.commit()

    return {"message": "Report deleted"}
