from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health():
    return {"status": "HRMS Lite API running"}

@app.post("/employees")
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(models.Employee).filter(models.Employee.employee_id == emp.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee already exists")
    employee = models.Employee(**emp.dict())
    db.add(employee)
    db.commit()
    return {"message": "Employee added"}

@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}

@app.post("/attendance")
def mark_attendance(att: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = models.Attendance(**att.dict())
    db.add(record)
    db.commit()
    return {"message": "Attendance marked"}

@app.get("/attendance/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id).all()