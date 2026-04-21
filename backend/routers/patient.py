from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.patient import Patient
from models.report import Report   # 🔥 ADD THIS
from schemas.patient import PatientCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Create Patient
@router.post("/patients")
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    new_patient = Patient(**patient.dict())
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

# ✅ Get All Patients
@router.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()

# 🔥 UPDATED: Get Single Patient + Reports
@router.get("/patients/{id}")
def get_patient(id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # 🔥 Fetch reports for this patient
    reports = db.query(Report).filter(Report.patient_id == id).all()

    return {
        "patient": patient,
        "reports": reports
    }