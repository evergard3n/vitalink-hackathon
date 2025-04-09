# app/schemas/doctor.py
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class DoctorBase(BaseModel):
    """Base schema for doctor"""
    full_name: str
    department_id: int
    specialization: Optional[str] = None
    qualification: Optional[str] = None
    availability_schedule: Optional[str] = None


class DoctorCreate(DoctorBase):
    """Schema for creating a new doctor"""
    pass


class DoctorUpdate(BaseModel):
    """Schema for updating a doctor"""
    full_name: Optional[str] = None
    department_id: Optional[int] = None
    specialization: Optional[str] = None
    qualification: Optional[str] = None
    availability_schedule: Optional[str] = None


class Doctor(DoctorBase):
    """Schema for a complete doctor"""
    doctor_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class DoctorList(BaseModel):
    """Schema for a list of doctors"""
    total: int
    items: List[Doctor]