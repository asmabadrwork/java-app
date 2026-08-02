from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
# pyrefly: ignore [missing-import]
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import asyncio

app = FastAPI(title="Python Testing Tool API", description="Comprehensive mock API endpoints for testing")

# Setup templates and static files for the UI
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Mock database
users_db = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
]

class UserCreate(BaseModel):
    name: str

class UserUpdate(BaseModel):
    name: str

# -----------------
# Frontend Route
# -----------------
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# -----------------
# API Endpoints
# -----------------
@app.get("/api/users")
async def get_users():
    return {"users": users_db}

@app.post("/api/users", status_code=201)
async def create_user(user: UserCreate):
    new_user = {"id": len(users_db) + 1, "name": user.name}
    users_db.append(new_user)
    return {"user": new_user, "message": "User created successfully"}

@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": user}

@app.put("/api/users/{user_id}")
async def update_user(user_id: int, user: UserUpdate):
    for u in users_db:
        if u["id"] == user_id:
            u["name"] = user.name
            return {"message": f"User {user_id} updated", "updatedData": u}
    raise HTTPException(status_code=404, detail="User not found")

@app.patch("/api/users/{user_id}")
async def patch_user(user_id: int, user: UserUpdate):
    for u in users_db:
        if u["id"] == user_id:
            u["name"] = user.name
            return {"message": f"User {user_id} partially updated", "patchedData": u}
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int):
    global users_db
    users_db = [u for u in users_db if u["id"] != user_id]
    return {"message": f"User {user_id} deleted successfully"}

@app.get("/api/error")
async def simulate_error():
    raise HTTPException(status_code=500, detail="This is a simulated error response for testing.")

@app.get("/api/delay")
async def simulate_delay():
    await asyncio.sleep(2)
    return {"message": "Success after a 2-second delay"}
