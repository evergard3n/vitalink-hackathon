# app/controllers/location_controller.py - Location controller
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

from ..models.models import Locations
from ..schemas.location import LocationCreate, LocationUpdate

class LocationController:
    @staticmethod
    def get_locations(
        db: Session, 
        skip: int = 0, 
        limit: int = 100,
        location_name: Optional[str] = None,
        building: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get all locations with optional filtering"""
        query = db.query(Locations)
        # Apply filters if provided
        if location_name:
            query = query.filter(Locations.location_name.ilike(f"%{location_name}%"))
        if building:
            query = query.filter(Locations.building.ilike(f"%{building}%"))
        
        total = query.count()
        locations = query.offset(skip).limit(limit).all()
        
        return {
            "total": total,
            "items": locations
        }
    
    @staticmethod
    def get_location(db: Session, location_id: int) -> Optional[Locations]:
        """Get a specific location by ID"""
        return db.query(Locations).filter(Locations.location_id == location_id).first()
    
    @staticmethod
    def create_location(db: Session, location: LocationCreate) -> Locations:
        """Create a new location"""
        db_location = Locations(**location.dict())
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
        return db_location
    
    @staticmethod
    def update_location(
        db: Session, 
        location_id: int, 
        location_data: LocationUpdate
    ) -> Optional[Locations]:
        """Update an existing location"""
        db_location = LocationController.get_location(db, location_id)
        if db_location:
            update_data = location_data.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_location, key, value)
            db.commit()
            db.refresh(db_location)
        return db_location
    
    @staticmethod
    def delete_location(db: Session, location_id: int) -> bool:
        """Delete a location"""
        db_location = LocationController.get_location(db, location_id)
        if db_location:
            db.delete(db_location)
            db.commit()
            return True
        return False