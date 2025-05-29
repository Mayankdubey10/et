from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import os
from models import User, UserCreate, Expense, ExpenseCreate

app = FastAPI()

# Get environment variables with defaults
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
users = {}
expenses = {}
user_counter = 0
expense_counter = 0

# User endpoints
@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    global user_counter
    user_counter += 1
    new_user = User(id=user_counter, **user.dict())
    users[user_counter] = new_user
    return new_user

@app.get("/users/", response_model=List[User])
async def get_users():
    return list(users.values())

# Expense endpoints
@app.post("/expenses/", response_model=Expense)
async def create_expense(expense: ExpenseCreate):
    global expense_counter
    try:
        if expense.user_id not in users:
            raise HTTPException(status_code=404, detail="User not found")
        
        if not isinstance(expense.amount, (int, float)) or expense.amount <= 0:
            raise HTTPException(status_code=422, detail="Amount must be a positive number")
            
        expense_counter += 1
        expense_dict = expense.dict()
        new_expense = Expense(id=expense_counter, **expense_dict)
        expenses[expense_counter] = new_expense
        return new_expense
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/expenses/", response_model=List[Expense])
async def get_expenses(
    user_id: Optional[int] = None,
    category: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    filtered_expenses = list(expenses.values())
    
    if user_id is not None:
        filtered_expenses = [e for e in filtered_expenses if e.user_id == user_id]
    
    if category is not None:
        filtered_expenses = [e for e in filtered_expenses if e.category == category]
    
    if start_date is not None:
        filtered_expenses = [e for e in filtered_expenses if e.date >= start_date]
    
    if end_date is not None:
        filtered_expenses = [e for e in filtered_expenses if e.date <= end_date]
    
    return filtered_expenses
