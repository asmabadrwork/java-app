from fastapi.testclient import TestClient
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app, users_db

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert "Python Testing Dashboard" in response.text

def test_get_users():
    response = client.get("/api/users")
    assert response.status_code == 200
    assert "users" in response.json()
    assert len(response.json()["users"]) >= 2

def test_create_user():
    initial_count = len(users_db)
    response = client.post("/api/users", json={"name": "Test User"})
    assert response.status_code == 201
    data = response.json()
    assert data["message"] == "User created successfully"
    assert data["user"]["name"] == "Test User"
    assert len(users_db) == initial_count + 1

def test_simulate_error():
    response = client.get("/api/error")
    assert response.status_code == 500
    assert response.json()["detail"] == "This is a simulated error response for testing."
