
# Vitalink Speech to Text
## Step 1: Sign up and get your api key
```
https://console.deepgram.com/project/00276d22-1f72-4a6a-880a-33972bcb9c30
```

## Step 2: Add your API_KEY in env
```
DEEPGRAM_API_KEY = "your_api_key"
```
## Step 3: Configure Environment Variables
```python
mv sample_env .env
```

Then update the .env file with your local database credentials and other configurations.

## Step 4: Navigate to the Backend Folder
```python
cd chatbot
```

## Step 5: Run the Development Server
```python
uvicorn main:app --reload
```

## Step 6: Access the API Documentation
Open your browser and go to:

http://127.0.0.1:8000/docs

