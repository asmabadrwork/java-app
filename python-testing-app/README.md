# Python Testing Tool

A robust FastAPI application designed to act as a Software Template for multiple testing purposes. It provides a comprehensive testing surface with mock endpoints and a frontend dashboard.

## Features
- **Software Template**: Configured to be used as a base template to quickly spin up testing applications across your developer portals.
- **FastAPI Backend**: Serving extremely fast Python API endpoints with automatic Swagger documentation.
- **Testing Surface**: Includes `GET`, `POST`, `PUT`, `DELETE`, error simulation, and delay endpoints.
- **Premium UI**: Uses Jinja2 templates and custom CSS for a modern, sleek appearance matching the React app.
- **Dockerized**: Includes a multi-stage Dockerfile for optimized production builds.
- **Unit Tests**: Includes Pytest setup for testing the API routes.

## Endpoints
This application exposes several endpoints for testing purposes:
- `GET /api/users` - Fetch a list of users.
- `POST /api/users` - Create a new user.
- `GET /api/users/{id}` - Fetch a specific user.
- `PUT /api/users/{id}` - Replace a user.
- `PATCH /api/users/{id}` - Partially update a user.
- `DELETE /api/users/{id}` - Delete a user.
- `GET /api/error` - Simulates a 500 Internal Server Error.
- `GET /api/delay` - Simulates a slow network request (2 seconds delay).

## Project Structure
For new developers navigating the codebase, here is a quick overview of where things live:
- **`main.py`**: The core FastAPI application containing all the API routes.
- **`templates/index.html` & `static/style.css`**: The frontend UI served by the Python app.
- **`tests/`**: Pytest unit tests for the API.
- **`NAMING_CONVENTIONS.md`**: ⚠️ **Important**: Please read our [Naming Conventions Guide](./NAMING_CONVENTIONS.md) before contributing to ensure consistency across the codebase!

## Getting Started

### Prerequisites
- Python 3.11+

### Installation & Running Locally
1. Navigate to the project directory:
   ```bash
   cd python-testing-app
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   uvicorn main:app --reload
   ```
4. Open [http://localhost:8000](http://localhost:8000) in your browser for the UI.
5. Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser for the Swagger API documentation.

### Running Tests
To execute the unit tests:
```bash
pytest
```

## Docker Build

To build and run the Docker image locally:
```bash
docker build -t python-testing-app .
docker run -p 8000:8000 python-testing-app
```
