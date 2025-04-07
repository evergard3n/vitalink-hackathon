# app/controllers/patient_controller.py - Patient controller
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from ..models.models import Patients
from ..schemas.patient import PatientCreate, PatientUpdate

class PatientController:
    @staticmethod
    def get_patients(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        full_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get all patients with optional filtering"""
        query = db.query(Patients)
        # Apply filters if provided
        if full_name:
            query = query.filter(Patients.full_name.ilike(f"%{full_name}%"))
        
        total = query.count()
        patients = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": patients
        }
    
    @staticmethod
    def get_patient(db: Session, patient_id: int) -> Optional[Patients]:
        """Get a specific patient by ID"""
        return db.query(Patients).filter(Patients.patient_id == patient_id).first()
    
    @staticmethod
    def create_patient(db: Session, patient: PatientCreate) -> Patients:
        """Create a new patient"""
        db_patient = Patients(**patient.dict())
        db.add(db_patient)
        db.commit()
        db.refresh(db_patient)
        return db_patient
    
    @staticmethod
    def update_patient(
        db: Session, 
        patient_id: int, 
        patient_data: PatientUpdate
    ) -> Optional[Patients]:
        """Update an existing patient"""
        db_patient = PatientController.get_patient(db, patient_id)
        if db_patient:
            update_data = patient_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_patient, key, value)
            db.commit()
            db.refresh(db_patient)
        return db_patient
    
    @staticmethod
    def delete_patient(db: Session, patient_id: int) -> bool:
        """Delete a patient"""
        db_patient = PatientController.get_patient(db, patient_id)
        if db_patient:
            db.delete(db_patient)
            db.commit()
            return True
        return False
