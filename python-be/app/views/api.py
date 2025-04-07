from fastapi import APIRouter
from ..views import (
    patient_view, 
#     doctor_view, 
    appointment_view, 
#     department_view,
#     location_view,
#     test_type_view
)

api_router = APIRouter()

# Include all routes
api_router.include_router(
    patient_view.router, 
    prefix="/patients", 
    tags=["patients"]
)
# api_router.include_router(
#     doctor_view.router, 
#     prefix="/doctors", 
#     tags=["doctors"]
# )
api_router.include_router(
    appointment_view.router, 
    prefix="/appointments", 
    tags=["appointments"]
)
# api_router.include_router(
#     department_view.router, 
#     prefix="/departments", 
#     tags=["departments"]
# )
# api_router.include_router(
#     location_view.router, 
#     prefix="/locations", 
#     tags=["locations"]
# )
# api_router.include_router(
#     test_type_view.router, 
#     prefix="/test-types", 
#     tags=["test-types"]
# )
