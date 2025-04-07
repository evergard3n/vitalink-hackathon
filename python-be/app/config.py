import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME = "VitaLink"
    API_V1_STR = "/api/v1"
    
    POSTGRES_SERVER = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB = os.getenv("POSTGRES_DB", "vitalink")
    POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
    
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    
    # # JWT settings
    # SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
    # ALGORITHM = "HS256"
    # ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # CORS settings
    CORS_ORIGINS = [
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:3000",
    ]

settings = Settings()