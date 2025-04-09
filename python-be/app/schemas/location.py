# app/schemas/location.py
from typing import Optional,List
from datetime import datetime
from pydantic import BaseModel


class LocationBase(BaseModel):
    """Base schema for location"""
    location_name: str
    building: Optional[str] = None
    floor: Optional[str] = None
    room_number: Optional[str] = None


class LocationCreate(LocationBase):
    """Schema for creating a new location"""
    pass


class LocationUpdate(BaseModel):
    """Schema for updating a location"""
    location_name: Optional[str] = None
    building: Optional[str] = None
    floor: Optional[str] = None
    room_number: Optional[str] = None


class Location(LocationBase):
    """Schema for a complete location"""
    location_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
class LocationList(BaseModel):
    """Schema for a list of locations"""
    total: int
    items: List[Location]