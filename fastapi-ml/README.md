# FastAPI Project

This is a simple FastAPI project that ingests data into a PostgreSQL database. This README provides instructions on how to set up and manage the virtual environment using `virtualenv`.

## Prerequisites

- Python 3.7 or higher
- `virtualenv` package (if not installed, you can install it using `pip`)

## Setting Up the Project

1. **Clone the Repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a Virtual Environment**:
   Make sure you are in the project root directory (where `requirements.txt` is located).
   ```bash
   python3 -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - For macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - For Windows:
     ```bash
     venv\Scripts\activate
     ```

   After activation, your terminal prompt should change to indicate that the virtual environment is active.

4. **Install Dependencies**:
   With the virtual environment activated, install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

To run the FastAPI application, ensure that the virtual environment is activated and execute the following command:

```bash
uvicorn app.main:app --reload
```



You can then access the API at `uvicorn app.main:app --reload --port 8001`.

## Deactivating the Virtual Environment

When you are done working in the virtual environment, you can deactivate it by running:

```bash
deactivate
```


Your terminal prompt will return to its normal state, indicating that the virtual environment is no longer active.

## Additional Notes

- To reactivate the virtual environment later, navigate back to the project directory and run the activation command again.
- If you need to install additional packages, make sure to do so while the virtual environment is activated.
