# Expense Tracker Application

A full-stack expense tracking application built with FastAPI (Backend) and React (Frontend).

## Features

- Create and manage users
- Track expenses with categories
- View expenses per user
- Filter expenses by category
- Modern and responsive UI

## Tech Stack

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- React
- Material-UI (MUI)
- Axios
- Vite

## Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

## API Documentation

Access the API documentation at `http://localhost:8000/docs` when the backend server is running.

### API Endpoints

#### Users
- `POST /users/` - Create a new user
- `GET /users/` - Get all users

#### Expenses
- `POST /expenses/` - Create a new expense
- `GET /expenses/` - Get all expenses
- `GET /expenses/?user_id={id}` - Get expenses by user
- `GET /expenses/?category={category}` - Filter expenses by category

## Project Structure

```
├── backend/
│   ├── main.py          # FastAPI application
│   ├── models.py        # Pydantic models
│   └── requirements.txt # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx     # Main React component
    │   └── main.jsx    # React entry point
    ├── package.json    # Node.js dependencies
    └── index.html      # HTML entry point
```
