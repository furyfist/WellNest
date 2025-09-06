from fastapi import FastAPI
# Import the single instance of our vector store.
from db.vector_store import vector_store_instance
from api.v1.api import api_router

app = FastAPI(title="WellNest API")

# --- NEW: STARTUP EVENT ---
@app.on_event("startup")
def startup_event():
    """
    This function will be called when the FastAPI application starts.
    It's the perfect place to load our ML models, database connections, etc.
    """
    print("Application startup: Loading vector store...")
    # Call the method to load the data from disk into the vector_store_instance.
    vector_store_instance.load_local()
    print("Vector store loaded successfully.")

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the WellNest API"}