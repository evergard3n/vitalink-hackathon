# app/controllers/department_controller.py - Department controller
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from ..models.models import Departments
from ..schemas.department import DepartmentCreate, DepartmentUpdate

class DepartmentController:
    @staticmethod
    def read_departments(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        department_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get all departments with optional filtering"""
        query = db.query(Departments)
        # Apply filters if provided
        if department_name:
            query = query.filter(Departments.department_name.ilike(f"%{department_name}%"))
            
        
        total = query.count()
        departments = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": departments
        }
    
    @staticmethod
    def read_department(db: Session, department_id: int) -> Optional[Departments]:
        """Get a specific department by ID"""
        return db.query(Departments).filter(Departments.department_id == department_id).first()
    
    @staticmethod
    def create_department(db: Session, department: DepartmentCreate) -> Departments:
        """Create a new department"""
        db_department = Departments(**department.dict())
        db.add(db_department)
        db.commit()
        db.refresh(db_department)
        return db_department
    
    @staticmethod
    def update_department(
        db: Session, 
        department_id: int, 
        department_data: DepartmentUpdate
    ) -> Optional[Departments]:
        """Update an existing department"""
        db_department = DepartmentController.get_department(db, department_id)
        if db_department:
            update_data = department_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_department, key, value)
            db.commit()
            db.refresh(db_department)
        return db_department
    
    @staticmethod
    def delete_department(db: Session, department_id: int) -> bool:
        """Delete a department"""
        db_department = DepartmentController.get_department(db, department_id)
        if db_department:
            db.delete(db_department)
            db.commit()
            return True
        return False