from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.database import get_db
from app.controllers.location_controller import LocationController
from app.schemas.location import Location, LocationCreate, LocationUpdate, LocationList
from fastapi import Response

router = APIRouter()

@router.get("/", response_model=LocationList)
def read_locations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    location_name: Optional[str] = None,
    building: Optional[str] = None
) -> Any:
    """Retrieve locations"""
    locations = LocationController.get_locations(
        db=db, 
        skip=skip, 
        limit=limit,
        location_name=location_name,
        building=building
    )
    return locations

@router.post("/", response_model=Location, status_code=status.HTTP_201_CREATED)
def create_location(
    *,
    db: Session = Depends(get_db),
    location_in: LocationCreate
) -> Any:
    """Create new location"""
    location = LocationController.create_location(db=db, location=location_in)
    return location

@router.get("/{location_id}", response_model=Location)
def read_location(
    *,
    db: Session = Depends(get_db),
    location_id: int
) -> Any:
    """Get location by ID"""
    location = LocationController.get_location(db=db, location_id=location_id)
    if not location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Location not found"
        )
    return location

@router.put("/{location_id}", response_model=Location)
def update_location(
    *,
    db: Session = Depends(get_db),
    location_id: int,
    location_in: LocationUpdate
) -> Any:
    """Update location"""
    location = LocationController.update_location(
        db=db,
        location_id=location_id,
        location_data=location_in
    )
    if not location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Location not found"
        )
    return location

@router.delete("/{location_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_location(
    *,
    db: Session = Depends(get_db),
    location_id: int
) -> Response:
    """Delete location"""
    success = LocationController.delete_location(db=db, location_id=location_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Location not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)