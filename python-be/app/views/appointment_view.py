from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional
from datetime import date

from app.database import get_db
from ..controllers.appointment_controller import AppointmentController
from ..schemas.appointment import Appointment, AppointmentCreate, AppointmentUpdate, AppointmentList
from fastapi import Response
router = APIRouter()

@router.get("/", response_model=AppointmentList)
def read_appointments(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    patient_id: Optional[int] = None,
    doctor_id: Optional[int] = None,
    department_id: Optional[int] = None,
    from_date: Optional[date] = None,
    to_date: Optional[date] = None,
    status: Optional[str] = None
) -> Any:
    """Retrieve appointments with filters"""
    appointments = AppointmentController.get_appointments(
        db=db, 
        skip=skip, 
        limit=limit,
        patient_id=patient_id,
        doctor_id=doctor_id,
        department_id=department_id,
        from_date=from_date,
        to_date=to_date,
        status=status
    )
    return appointments

@router.post("/", response_model=Appointment, status_code=status.HTTP_201_CREATED)
def create_appointment(
    *,
    db: Session = Depends(get_db),
    appointment_in: AppointmentCreate
) -> Any:
    """Create new appointment"""
    appointment = AppointmentController.create_appointment(db=db, appointment=appointment_in)
    return appointment

@router.get("/{appointment_id}", response_model=Appointment)
def read_appointment(
    *,
    db: Session = Depends(get_db),
    appointment_id: int
) -> Any:
    """Get appointment by ID"""
    appointment = AppointmentController.get_appointment(db=db, appointment_id=appointment_id)
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    return appointment

@router.put("/{appointment_id}", response_model=Appointment)
def update_appointment(
    *,
    db: Session = Depends(get_db),
    appointment_id: int,
    appointment_in: AppointmentUpdate
) -> Any:
    """Update appointment"""
    appointment = AppointmentController.update_appointment(
        db=db,
        appointment_id=appointment_id,
        appointment_data=appointment_in
    )
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    return appointment

@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    *,
    db: Session = Depends(get_db),
    appointment_id: int
) -> Response:
    """Delete appointment"""
    success = AppointmentController.delete_appointment(db=db, appointment_id=appointment_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
