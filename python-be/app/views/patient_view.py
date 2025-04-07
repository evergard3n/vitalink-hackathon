from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.database import get_db
from app.controllers.patient_controller import PatientController
from app.schemas.patient import Patient, PatientCreate, PatientUpdate, PatientList
from fastapi import Response

router = APIRouter()

@router.get("/", response_model=PatientList)
def read_patients(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    full_name: Optional[str] = None
) -> Any:
    """Retrieve patients"""
    patients = PatientController.get_patients(
        db=db, 
        skip=skip, 
        limit=limit, 
        full_name=full_name
    )
    return patients

@router.post("/", response_model=Patient, status_code=status.HTTP_201_CREATED)
def create_patient(
    *,
    db: Session = Depends(get_db),
    patient_in: PatientCreate
) -> Any:
    """Create new patient"""
    patient = PatientController.create_patient(db=db, patient=patient_in)
    return patient

@router.get("/{patient_id}", response_model=Patient)
def read_patient(
    *,
    db: Session = Depends(get_db),
    patient_id: int
) -> Any:
    """Get patient by ID"""
    patient = PatientController.get_patient(db=db, patient_id=patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.put("/{patient_id}", response_model=Patient)
def update_patient(
    *,
    db: Session = Depends(get_db),
    patient_id: int,
    patient_in: PatientUpdate
) -> Any:
    """Update patient"""
    patient = PatientController.update_patient(
        db=db,
        patient_id=patient_id,
        patient_data=patient_in
    )
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(
    *,
    db: Session = Depends(get_db),
    patient_id: int
) -> Response:
    """Delete patient"""
    success = PatientController.delete_patient(db=db, patient_id=patient_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
