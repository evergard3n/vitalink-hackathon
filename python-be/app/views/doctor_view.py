from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.database import get_db
from app.controllers.doctor_controller import DoctorController
from app.schemas.doctor import Doctor, DoctorCreate, DoctorUpdate, DoctorList
from fastapi import Response

router = APIRouter()

@router.get("/", response_model=DoctorList)
def read_doctors(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    full_name: Optional[str] = None,
    department_id: Optional[int] = None,
    specialization: Optional[str] = None
) -> Any:
    """Retrieve doctors"""
    doctors = DoctorController.get_doctors(
        db=db, 
        skip=skip, 
        limit=limit,
        full_name=full_name,
        department_id=department_id,
        specialization=specialization
    )
    return doctors

@router.post("/", response_model=Doctor, status_code=status.HTTP_201_CREATED)
def create_doctor(
    *,
    db: Session = Depends(get_db),
    doctor_in: DoctorCreate
) -> Any:
    """Create new doctor"""
    doctor = DoctorController.create_doctor(db=db, doctor=doctor_in)
    return doctor

@router.get("/{doctor_id}", response_model=Doctor)
def read_doctor(
    *,
    db: Session = Depends(get_db),
    doctor_id: int
) -> Any:
    """Get doctor by ID"""
    doctor = DoctorController.get_doctor(db=db, doctor_id=doctor_id)
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    return doctor

@router.put("/{doctor_id}", response_model=Doctor)
def update_doctor(
    *,
    db: Session = Depends(get_db),
    doctor_id: int,
    doctor_in: DoctorUpdate
) -> Any:
    """Update doctor"""
    doctor = DoctorController.update_doctor(
        db=db,
        doctor_id=doctor_id,
        doctor_data=doctor_in
    )
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    return doctor

@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doctor(
    *,
    db: Session = Depends(get_db),
    doctor_id: int
) -> Response:
    """Delete doctor"""
    success = DoctorController.delete_doctor(db=db, doctor_id=doctor_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)