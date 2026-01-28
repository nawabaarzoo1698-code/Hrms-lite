import { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch {
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    await api.delete(`/employees/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (employees.length === 0) return <p>No employees found</p>;

  return (
    <div>
      <h3>Employees</h3>
      <ul>
        {employees.map((e) => (
          <li key={e.employee_id}>
            {e.full_name} ({e.department})
            <button onClick={() => remove(e.employee_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}