# backend/main.py

from fastapi import FastAPI
# --- CORRECTED IMPORTS ---
# We use absolute imports starting from the 'backend' package name,
# because we are running the application from the root directory.
from backend.db.vector_store import vector_store_instance
from backend.api.v1.api import api_router

app = FastAPI(title="WellNest API")

# --- STARTUP EVENT ---
@app.on_event("startup")
def startup_event():
    """
    This function will be called when the FastAPI application starts.
    """
    print("Application startup: Loading vector store...")
    vector_store_instance.load_local()
    print("Vector store loaded successfully.")

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the WellNest API"}