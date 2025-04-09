# app/controllers/doctor_controller.py - Doctor controller
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from ..models.models import Doctors
from ..schemas.doctor import DoctorCreate, DoctorUpdate

class DoctorController:
    @staticmethod
    def get_doctors(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        full_name: Optional[str] = None,
        department_id: Optional[int] = None,
        specialization: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get all doctors with optional filtering"""
        query = db.query(Doctors)
        # Apply filters if provided
        if full_name:
            query = query.filter(Doctors.full_name.ilike(f"%{full_name}%"))
        if department_id:
            query = query.filter(Doctors.department_id == department_id)
        if specialization:
            query = query.filter(Doctors.specialization.ilike(f"%{specialization}%"))
        
        total = query.count()
        doctors = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": doctors
        }
    
    @staticmethod
    def get_doctor(db: Session, doctor_id: int) -> Optional[Doctors]:
        """Get a specific doctor by ID"""
        return db.query(Doctors).filter(Doctors.doctor_id == doctor_id).first()
    
    @staticmethod
    def create_doctor(db: Session, doctor: DoctorCreate) -> Doctors:
        """Create a new doctor"""
        db_doctor = Doctors(**doctor.dict())
        db.add(db_doctor)
        db.commit()
        db.refresh(db_doctor)
        return db_doctor
    
    @staticmethod
    def update_doctor(
        db: Session, 
        doctor_id: int, 
        doctor_data: DoctorUpdate
    ) -> Optional[Doctors]:
        """Update an existing doctor"""
        db_doctor = DoctorController.get_doctor(db, doctor_id)
        if db_doctor:
            update_data = doctor_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_doctor, key, value)
            db.commit()
            db.refresh(db_doctor)
        return db_doctor
    
    @staticmethod
    def delete_doctor(db: Session, doctor_id: int) -> bool:
        """Delete a doctor"""
        db_doctor = DoctorController.get_doctor(db, doctor_id)
        if db_doctor:
            db.delete(db_doctor)
            db.commit()
            return True
        return False