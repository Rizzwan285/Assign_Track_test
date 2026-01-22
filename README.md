# Assignment Tracking System

A full-stack web application for managing academic assignments. Built with FastAPI backend and React frontend.

![Assignment Tracker](https://img.shields.io/badge/Status-Complete-success)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688)

## Features

- **Complete CRUD Operations** - Create, Read, Update, and Delete assignments
- **Live Statistics Dashboard** - Real-time count of Pending, In Progress, and Completed assignments
- **UI Design** - Card-based layout with status indicators
- **Date Formatting** - Human-readable dates
- **Status Cycling** - Click status badges to update status
- **Real-time Updates** - Instant UI refresh after any operation
- **Persistent Storage** - PostgreSQL database

## Technology Stack

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React** - UI library
- **Lucide React** - Icons
- **date-fns** - Date formatting
- **Vanilla CSS** - Custom styling

## Prerequisites

Ensure you have the following installed:

- **Python 3.9+**
- **Node.js 16+**
- **PostgreSQL**
- **Git**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rizzwan285/Assign_Track_test.git
cd Assign_Track_test
```

### 2. Backend Setup

#### a. Create Virtual Environment
```bash
cd backend
python -m venv venv
```

#### b. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### c. Install Dependencies
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
```

#### d. Configure Database
1. Make sure PostgreSQL is running
2. Create database (default credentials: `postgres`/`postgres`):
```bash
python create_db.py
```

**Or manually using PostgreSQL:**
```sql
CREATE DATABASE assignment_db;
```

#### e. Environment Variables (Optional)
If your PostgreSQL has different credentials, set the `DATABASE_URL`:

**Windows:**
```bash
set DATABASE_URL=postgresql://username:password@localhost:5432/assignment_db
```

**macOS/Linux:**
```bash
export DATABASE_URL=postgresql://username:password@localhost:5432/assignment_db
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
# Ensure virtual environment is activated
uvicorn main:app --reload
```

Backend will run at: **http://localhost:8000**
- API Docs: **http://localhost:8000/docs**

### Start Frontend Server

Open a **new terminal** and run:

```bash
cd frontend
npm start
```

Frontend will run at: **http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/assignments` | Create a new assignment |
| `GET` | `/api/assignments` | Get all assignments |
| `GET` | `/api/assignments/{id}` | Get assignment by ID |
| `PATCH` | `/api/assignments/{id}` | Update assignment |
| `DELETE` | `/api/assignments/{id}` | Delete assignment |

### Example API Request

**Create Assignment:**
```bash
curl -X POST "http://localhost:8000/api/assignments" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Data Structures Lab",
    "description": "Complete binary tree implementation"
  }'
```

## Project Structure

```
Assign_Track_test/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── create_db.py
│   └── reset_db.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```

## Data Model

### Assignment
```typescript
{
  id: number
  title: string
  description: string?
  status: string
  created_time: datetime
  updated_time: datetime
}
```

## Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL service is running
- Verify database credentials in `database.py`
- Check if `assignment_db` database exists

### Port Already in Use
If port 8000 or 3000 is busy:

**Backend (change to port 8001):**
```bash
uvicorn main:app --reload --port 8001
```

**Frontend:** React will automatically prompt for another port

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
# Backend
pip install -r requirements.txt
# or install manually as shown in Setup

# Frontend
npm install
```

## Testing the Application

1. **Create Assignment**: Fill the form and click "Create Assignment"
2. **View Stats**: Check the stats bar updates with counts
3. **Cycle Status**: Click on status badges to change status
4. **Delete**: Hover over a card and click the trash icon

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/assignment_db` | PostgreSQL connection string |

## Contributors

- Muhammad Rizwan ([@Rizzwan285](https://github.com/Rizzwan285))

## License

This project is created for educational purposes.

## Acknowledgments

- Built as part of OELP Assignment
