from typing import Optional, List, Any
from datetime import date, time, datetime
from pydantic import BaseModel

class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: Optional[int] = None
    test_type_id: Optional[int] = None
    department_id: int
    location_id: int
    appointment_date: date
    appointment_time: time
    reason: Optional[str] = None
    status: str
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    doctor_id: Optional[int] = None
    test_type_id: Optional[int] = None
    department_id: Optional[int] = None
    location_id: Optional[int] = None
    appointment_date: Optional[date] = None
    appointment_time: Optional[time] = None
    reason: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class AppointmentInDBBase(AppointmentBase):
    appointment_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True

class Appointment(AppointmentInDBBase):
    pass

class AppointmentList(BaseModel):
    total: int
    items: List[Appointment]
