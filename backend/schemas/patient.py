from pydantic import BaseModel

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    contact: str

class PatientResponse(PatientCreate):
    id: int

    class Config:
        orm_mode = True