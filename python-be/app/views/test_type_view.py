from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.database import get_db
from app.controllers.test_type_controller import TestTypeController
from app.schemas.test_type import TestType, TestTypeCreate, TestTypeUpdate, TestTypeList
from fastapi import Response

router = APIRouter()

@router.get("/", response_model=TestTypeList)
def read_test_types(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    test_name: Optional[str] = None,
    department_id: Optional[int] = None
) -> Any:
    """Retrieve test types"""
    test_types = TestTypeController.get_test_types(
        db=db, 
        skip=skip, 
        limit=limit,
        test_name=test_name,
        department_id=department_id
    )
    return test_types

@router.post("/", response_model=TestType, status_code=status.HTTP_201_CREATED)
def create_test_type(
    *,
    db: Session = Depends(get_db),
    test_type_in: TestTypeCreate
) -> Any:
    """Create new test type"""
    test_type = TestTypeController.create_test_type(db=db, test_type=test_type_in)
    return test_type

@router.get("/{test_type_id}", response_model=TestType)
def read_test_type(
    *,
    db: Session = Depends(get_db),
    test_type_id: int
) -> Any:
    """Get test type by ID"""
    test_type = TestTypeController.get_test_type(db=db, test_type_id=test_type_id)
    if not test_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test type not found"
        )
    return test_type

@router.put("/{test_type_id}", response_model=TestType)
def update_test_type(
    *,
    db: Session = Depends(get_db),
    test_type_id: int,
    test_type_in: TestTypeUpdate
) -> Any:
    """Update test type"""
    test_type = TestTypeController.update_test_type(
        db=db,
        test_type_id=test_type_id,
        test_type_data=test_type_in
    )
    if not test_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test type not found"
        )
    return test_type

@router.delete("/{test_type_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_test_type(
    *,
    db: Session = Depends(get_db),
    test_type_id: int
) -> Response:
    """Delete test type"""
    success = TestTypeController.delete_test_type(db=db, test_type_id=test_type_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test type not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)