# app/controllers/test_type_controller.py - TestType controller
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from ..models.models import Testtypes
from ..schemas.test_type import TestTypeCreate, TestTypeUpdate

class TestTypeController:
    @staticmethod
    def get_test_types(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        test_name: Optional[str] = None,
        department_id: Optional[int] = None,
        location_id: Optional[int] = None
    ) -> Dict[str, Any]:
        """Get all test types with optional filtering"""
        query = db.query(Testtypes)
        # Apply filters if provided
        if test_name:
            query = query.filter(Testtypes.test_name.ilike(f"%{test_name}%"))
        if department_id:
            query = query.filter(Testtypes.department_id == department_id)
        if location_id:
            query = query.filter(Testtypes.default_location_id == location_id)
        
        total = query.count()
        test_types = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": test_types
        }
    
    @staticmethod
    def get_test_type(db: Session, test_type_id: int) -> Optional[Testtypes]:
        """Get a specific test type by ID"""
        return db.query(Testtypes).filter(Testtypes.test_type_id == test_type_id).first()
    
    @staticmethod
    def create_test_type(db: Session, test_type: TestTypeCreate) -> Testtypes:
        """Create a new test type"""
        db_test_type = Testtypes(**test_type.dict())
        db.add(db_test_type)
        db.commit()
        db.refresh(db_test_type)
        return db_test_type
    
    @staticmethod
    def update_test_type(
        db: Session, 
        test_type_id: int, 
        test_type_data: TestTypeUpdate
    ) -> Optional[Testtypes]:
        """Update an existing test type"""
        db_test_type = TestTypeController.get_test_type(db, test_type_id)
        if db_test_type:
            update_data = test_type_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_test_type, key, value)
            db.commit()
            db.refresh(db_test_type)
        return db_test_type
    
    @staticmethod
    def delete_test_type(db: Session, test_type_id: int) -> bool:
        """Delete a test type"""
        db_test_type = TestTypeController.get_test_type(db, test_type_id)
        if db_test_type:
            db.delete(db_test_type)
            db.commit()
            return True
        return False