# app/schemas/test_type.py
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from decimal import Decimal


class TestTypeBase(BaseModel):
    """Base schema for test type"""
    test_name: str
    preparation_instructions: Optional[str] = None
    contraindication_description: Optional[str] = None
    duration_minutes: Optional[int] = None
    price: Optional[Decimal] = None
    default_location_id: Optional[int] = None
    department_id: Optional[int] = None


class TestTypeCreate(TestTypeBase):
    """Schema for creating a new test type"""
    pass


class TestTypeUpdate(BaseModel):
    """Schema for updating a test type"""
    test_name: Optional[str] = None
    preparation_instructions: Optional[str] = None
    contraindication_description: Optional[str] = None
    duration_minutes: Optional[int] = None
    price: Optional[Decimal] = None
    default_location_id: Optional[int] = None
    department_id: Optional[int] = None


class TestType(TestTypeBase):
    """Schema for a complete test type"""
    test_type_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class TestTypeList(BaseModel):
    """Schema for a list of test types"""
    total: int
    items: List[TestType]