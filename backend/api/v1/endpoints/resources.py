# backend/api/v1/endpoints/resources.py

from fastapi import APIRouter
from typing import List
# --- CORRECTED IMPORT ---
# Making the import absolute from the 'backend' package.
from backend.models.schemas import Resource

router = APIRouter()

# Dummy data that matches our 'Resource' schema structure.
dummy_resources = [
    {"id": 1, "title": "Understanding Anxiety", "content": "Anxiety is a normal human emotion..."},
    {"id": 2, "title": "Techniques for Stress Management", "content": "Deep breathing exercises can help..."},
]

@router.get("/")
# We add a return type hint '-> List[Resource]'.
# This tells FastAPI and our code editor that this function is expected
# to return a list where each item is structured like our 'Resource' schema.
def get_all_resources() -> List[Resource]:
    """
    This endpoint will fetch a list of all available mental health resources.
    """
    return dummy_resources

@router.get("/{resource_id}")
# We add a return type hint that it can either be a 'Resource' or a 'dict' (for the error).
def get_resource_by_id(resource_id: int) -> Resource | dict:
    """
    This endpoint will fetch a single resource by its ID.
    """
    resource_found = None
    for resource in dummy_resources:
        if resource["id"] == resource_id:
            resource_found = resource
            break
            
    return resource_found or {"error": "Resource not found"}