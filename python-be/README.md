# Vitalink Backend
## Step 1: Set Up the Database
Create your database by python-be/database.sql and set your database_name is "vitalink"
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

