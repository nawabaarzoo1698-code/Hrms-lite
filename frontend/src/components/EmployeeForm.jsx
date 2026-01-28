import { useState } from "react";
import api from "../api/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
      employee_id: "",
          full_name: "",
              email: "",
                  department: "",
                    });

                      const handleChange = (e) => {
                          setForm({ ...form, [e.target.name]: e.target.value });
                            };

                              const submit = async () => {
                                  try {
                                        await api.post("/employees", form);
                                              alert("Employee added");
                                                    setForm({ employee_id: "", full_name: "", email: "", department: "" });
                                                        } catch (err) {
                                                              alert(err.response?.data?.detail || "Error");
                                                                  }
                                                                    };

                                                                      return (
                                                                          <div>
                                                                                <h3>Add Employee</h3>

                                                                                      <input name="employee_id" placeholder="Employee ID" onChange={handleChange} value={form.employee_id} />
                                                                                            <input name="full_name" placeholder="Full Name" onChange={handleChange} value={form.full_name} />
                                                                                                  <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
                                                                                                        <input name="department" placeholder="Department" onChange={handleChange} value={form.department} />

                                                                                                              <button onClick={submit}>Add</button>
                                                                                                                  </div>
                                                                                                                    );
                                                                                                                    }