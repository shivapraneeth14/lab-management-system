from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from database import SessionLocal
from models.patient import Patient
from models.report import Report

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):

    # ✅ Total patients
    total_patients = db.query(func.count(Patient.id)).scalar()

    # ✅ Total reports
    total_reports = db.query(func.count(Report.id)).scalar()

    # ✅ Abnormal reports
    abnormal_reports = db.query(func.count(Report.id))\
        .filter(Report.status == "Abnormal").scalar()

    # ✅ Today's reports
    today_reports = db.query(func.count(Report.id))\
        .filter(Report.report_date == date.today()).scalar()

    # ✅ Recent reports with patient name (JOIN)
    recent_data = db.query(Report, Patient)\
        .join(Patient, Report.patient_id == Patient.id)\
        .order_by(Report.id.desc())\
        .limit(10).all()

    # ✅ Format response (IMPORTANT)
    recent_reports = []
    for report, patient in recent_data:
        recent_reports.append({
            "report_id": report.id,
            "patient_name": patient.name,
            "report_type": report.report_type,
            "report_date": report.report_date,
            "status": report.status
        })

    return {
        "total_patients": total_patients,
        "total_reports": total_reports,
        "abnormal_reports": abnormal_reports,
        "today_reports": today_reports,
        "recent_reports": recent_reports
    }