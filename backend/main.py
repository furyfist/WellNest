# backend/main.py

from fastapi import FastAPI
# Import the CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

from backend.db.vector_store import vector_store_instance
from backend.api.v1.api import api_router

app = FastAPI(title="WellNest API")

# --- NEW: CORS MIDDLEWARE SETUP ---

# Define the list of origins that are allowed to make requests to our API.
# For development, we allow all origins ("*").
# For production, you would want to restrict this to your actual frontend's domain.
# e.g., ["https://your-wellnest-app.com"]
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True, # Allows cookies (not used here, but good practice)
    allow_methods=["*"],    # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

@app.on_event("startup")
def startup_event():
    print("Application startup: Loading vector store...")
    vector_store_instance.load_local()
    print("Vector store loaded successfully.")

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the WellNest API"}