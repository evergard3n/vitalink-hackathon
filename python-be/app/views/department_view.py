from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.database import get_db
from app.controllers.department_controller import DepartmentController
from app.schemas.department import Department, DepartmentCreate, DepartmentUpdate, DepartmentList
from fastapi import Response

router = APIRouter()

@router.get("/", response_model=DepartmentList)
def read_departments(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    department_name: Optional[str] = None
) -> Any:
    """Retrieve departments"""
    departments = DepartmentController.read_departments(
        db=db, 
        skip=skip, 
        limit=limit,
        department_name=department_name
    )
    return departments

@router.post("/", response_model=Department, status_code=status.HTTP_201_CREATED)
def create_department(
    *,
    db: Session = Depends(get_db),
    department_in: DepartmentCreate
) -> Any:
    """Create new department"""
    department = DepartmentController.create_department(db=db, department=department_in)
    return department

@router.get("/{department_id}", response_model=Department)
def read_department(
    *,
    db: Session = Depends(get_db),
    department_id: int
) -> Any:
    """Get department by ID"""
    department = DepartmentController.read_department(db=db, department_id=department_id)
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    return department

@router.put("/{department_id}", response_model=Department)
def update_department(
    *,
    db: Session = Depends(get_db),
    department_id: int,
    department_in: DepartmentUpdate
) -> Any:
    """Update department"""
    department = DepartmentController.update_department(
        db=db,
        department_id=department_id,
        department_data=department_in
    )
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    return department

@router.delete("/{department_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_department(
    *,
    db: Session = Depends(get_db),
    department_id: int
) -> Response:
    """Delete department"""
    success = DepartmentController.delete_department(db=db, department_id=department_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)