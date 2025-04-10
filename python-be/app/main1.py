from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
import httpx
import json
from typing import Optional
import os
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Deepgram Transcription API", 
              description="A FastAPI wrapper for Deepgram speech-to-text API")

# Get API key from environment variable
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
if not DEEPGRAM_API_KEY:
    raise ValueError("DEEPGRAM_API_KEY environment variable is not set")

DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"

class TranscriptionOptions(BaseModel):
    language: Optional[str] = "en-US"
    model: Optional[str] = "nova"
    punctuate: Optional[bool] = True
    diarize: Optional[bool] = False
    smart_format: Optional[bool] = True

class TranscriptionURLRequest(BaseModel):
    url: str
    options: Optional[TranscriptionOptions] = TranscriptionOptions()

@app.post("/transcribe/file", summary="Transcribe an audio file")
async def transcribe_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...), 
    language: str = "vi",
    model: str = "nova-2",
    punctuate: bool = True,
    diarize: bool = False,
    smart_format: bool = True
):
    """
    Upload and transcribe an audio file using Deepgram API
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Read file content
    file_content = await file.read()
    
    # Construct query parameters
    params = {
        "language": language,
        "model": model,
        "punctuate": str(punctuate).lower(),
        "diarize": str(diarize).lower(),
        "smart_format": str(smart_format).lower()
    }
    
    # Define headers
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "audio/*"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                DEEPGRAM_URL,
                params=params,
                headers=headers,
                content=file_content,
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Deepgram API error: {response.text}"
                )
                
            # Close file in background to avoid blocking
            background_tasks.add_task(file.file.close)
            
            return response.json()
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to Deepgram API timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/transcribe/url", summary="Transcribe audio from a URL")
async def transcribe_url(request: TranscriptionURLRequest):
    """
    Transcribe audio from a URL using Deepgram API
    """
    # Construct query parameters
    params = {
        "language": request.options.language,
        "model": request.options.model,
        "punctuate": str(request.options.punctuate).lower(),
        "diarize": str(request.options.diarize).lower(),
        "smart_format": str(request.options.smart_format).lower()
    }
    
    # Define headers
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Prepare request body
    payload = {"url": request.url}
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                DEEPGRAM_URL,
                params=params,
                headers=headers,
                json=payload,
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Deepgram API error: {response.text}"
                )
                
            return response.json()
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request to Deepgram API timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/", summary="API information")
async def root():
    """
    Get information about the API
    """
    return {
        "api": "Deepgram FastAPI Wrapper",
        "version": "1.0.0",
        "endpoints": [
            {"path": "/", "method": "GET", "description": "This information"},
            {"path": "/transcribe/file", "method": "POST", "description": "Transcribe an uploaded audio file"},
            {"path": "/transcribe/url", "method": "POST", "description": "Transcribe audio from a URL"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)