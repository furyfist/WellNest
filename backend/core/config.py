from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load the .env file
load_dotenv()


class Settings(BaseSettings):
    """
    This class holds all the configuration settings for the application.
    Pydantic's BaseSettings will automatically try to read these values
    from environment variables.
    """
    PROJECT_NAME: str = "WellNest AI Chatbot"

    API_V1_STR: str = "/api/v1"

    GEMINI_API_KEY: str 
    GEMINI_MODEL_NAME: str = "gemini-2.5-pro"


    class Config:
        # This tells Pydantic to look for a .env file if it exists,
        # which is useful for local development.
        env_file = ".env"
        case_sensitive = True


settings = Settings()
