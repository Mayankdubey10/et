from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str

class User(UserBase):
    id: int

class ExpenseBase(BaseModel):
    title: str
    amount: float
    date: datetime
    category: str
    user_id: int

class Expense(ExpenseBase):
    id: int

class ExpenseCreate(ExpenseBase):
    pass

class UserCreate(UserBase):
    pass
