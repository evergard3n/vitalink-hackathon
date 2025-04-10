# Vitalink Backend
## Step 1: Set Up the Database
Create your database by python-be/database.sql and set your database_name is "vitalink"
```psql -U postgres -h localhost -d vitalink -f database.sql
```

## Step 2:  Set Up the Python Environment
It's recommended to use a virtual environment:
```python
python3 -m venv venv
```

Then install the required dependencies:
```python
pip install -r requirements.txt
```

## Step 3: Configure Environment Variables
```python
mv sample_env .env
```

Then update the .env file with your local database credentials and other configurations.

## Step 4: Navigate to the Backend Folder
```python
cd python-be
```

## Step 5: Run the Development Server
```python
uvicorn app.main:app --reload
```

## Step 6: Access the API Documentation
Open your browser and go to:

http://127.0.0.1:8000/docs


# Vitalink Speech to Text
## Step 1: Sign up and get your api key
```
https://console.deepgram.com/project/00276d22-1f72-4a6a-880a-33972bcb9c30
```

## Step 2: Add your API_KEY in env
```
DEEPGRAM_API_KEY = "your_api_key"
```

## Step 3: Navigate to the Backend Folder
```
cd python-be
```

## Step 5: Run the Development Server
```
uvicorn app.main1:app --reload
```

## Step 6: Access the API Documentation
Open your browser and go to:

http://127.0.0.1:8000/docs


