from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Dict, List
from datetime import date

app = FastAPI(title="HRMS Lite API")

# -------------------
# In-memory storage
# -------------------
employees: Dict[str, dict] = {}
attendance: Dict[str, List[dict]] = {}

# -------------------
# Models
# -------------------
class Employee(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class Attendance(BaseModel):
    date: date
    status: str  # Present / Absent


                        # -------------------
                        # Routes
                        # -------------------
@app.get("/")
def root():
    return {"message": "HRMS Lite Backend Running"}

@app.post("/employees")
def add_employee(emp: Employee):
    if emp.employee_id in employees:
        raise HTTPException(status_code=400, detail="Employee already exists")

    employees[emp.employee_id] = emp.dict()
    attendance[emp.employee_id] = []
    return emp

@app.get("/employees")
def list_employees():
    return list(employees.values())

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str):
    if employee_id not in employees:
       raise HTTPException(status_code=404, detail="Employee not found")

    del employees[employee_id]
    del attendance[employee_id]
    return {"message": "Employee deleted"}

@app.post("/attendance/{employee_id}")
def mark_attendance(employee_id: str, record: Attendance):
    if employee_id not in employees:
        raise HTTPException(status_code=404, detail="Employee not found")

    attendance[employee_id].append(record.dict())
    return {"message": "Attendance marked"}

@app.get("/attendance/{employee_id}")
def get_attendance(employee_id: str):
    if employee_id not in attendance:
        raise HTTPException(status_code=404, detail="Employee not found")

    return attendance[employee_id]