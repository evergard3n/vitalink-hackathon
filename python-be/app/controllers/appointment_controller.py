from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import date

from ..models.models import Appointments
from ..schemas.appointment import AppointmentCreate, AppointmentUpdate

class AppointmentController:
    @staticmethod
    def get_appointments(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        patient_id: Optional[int] = None,
        doctor_id: Optional[int] = None,
        department_id: Optional[int] = None,
        from_date: Optional[date] = None,
        to_date: Optional[date] = None,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get all appointments with optional filtering"""
        query = db.query(Appointments)
        
        # Apply filters if provided
        if patient_id:
            query = query.filter(Appointments.patient_id == patient_id)
        if doctor_id:
            query = query.filter(Appointments.doctor_id == doctor_id)
        if department_id:
            query = query.filter(Appointments.department_id == department_id)
        if from_date:
            query = query.filter(Appointments.appointment_date >= from_date)
        if to_date:
            query = query.filter(Appointments.appointment_date <= to_date)
        if status:
            query = query.filter(Appointments.status == status)
        
        total = query.count()
        appointments = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": appointments
        }
    
    @staticmethod
    def get_appointment(db: Session, appointment_id: int) -> Optional[Appointments]:
        """Get a specific appointment by ID"""
        return db.query(Appointments).filter(Appointments.appointment_id == appointment_id).first()
    
    @staticmethod
    def create_appointment(db: Session, appointment: AppointmentCreate) -> Appointments:
        """Create a new appointment"""
        db_appointment = Appointments(**appointment.dict())
        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)
        return db_appointment
    
    @staticmethod
    def update_appointment(
        db: Session, 
        appointment_id: int, 
        appointment_data: AppointmentUpdate
    ) -> Optional[Appointments]:
        """Update an existing appointment"""
        db_appointment = AppointmentController.get_appointment(db, appointment_id)
        if db_appointment:
            update_data = appointment_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_appointment, key, value)
            db.commit()
            db.refresh(db_appointment)
        return db_appointment
    
    @staticmethod
    def delete_appointment(db: Session, appointment_id: int) -> bool:
        """Delete an appointment"""
        db_appointment = AppointmentController.get_appointment(db, appointment_id)
        if db_appointment:
            db.delete(db_appointment)
            db.commit()
            return True
        return False