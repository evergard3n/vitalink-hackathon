from typing import Optional, List, Any
from datetime import date, datetime
from pydantic import BaseModel

class PatientBase(BaseModel):
    full_name: str
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None
    ethnicity: Optional[str] = None
    occupation: Optional[str] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    full_name: Optional[str] = None

class PatientInDBBase(PatientBase):
    patient_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True

class Patient(PatientInDBBase):
    pass

class PatientList(BaseModel):
    total: int
    items: List[Patient]