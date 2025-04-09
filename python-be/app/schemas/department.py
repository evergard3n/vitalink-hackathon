# app/schemas/department.py
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class DepartmentBase(BaseModel):
    """Base schema for department"""
    department_name: str
    department_location: Optional[str] = None
    description: Optional[str] = None
    class Config:
        orm_mode = True

class DepartmentCreate(DepartmentBase):
    """Schema for creating a new department"""
    pass


class DepartmentUpdate(BaseModel):
    """Schema for updating a department"""
    department_name: Optional[str] = None
    department_location: Optional[str] = None
    description: Optional[str] = None


class Department(DepartmentBase):
    """Schema for a complete department"""
    department_id: int
    created_at: datetime
    updated_at: datetime

class DepartmentList(BaseModel):
    total: int
    items: List[Department]

