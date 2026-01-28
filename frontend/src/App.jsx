import { useEffect, useState } from "react";
import { getEmployees, addEmployee } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employee_id: "", full_name: "", email: "", department: ""
          });

            useEffect(() => {
                getEmployees().then(setEmployees);
                  }, []);

                    const submit = async () => {
                        await addEmployee(form);
                            setEmployees(await getEmployees());
                              };

                                return (
                                    <div style={{padding: 20}}>
                                          <h2>HRMS Lite</h2>

                                                <input placeholder="Employee ID" onChange={e => setForm({...form, employee_id: e.target.value})}/>
                                                      <input placeholder="Name" onChange={e => setForm({...form, full_name: e.target.value})}/>
                                                            <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
                                                                  <input placeholder="Department" onChange={e => setForm({...form, department: e.target.value})}/>
                                                                        <button onClick={submit}>Add</button>

                                                                              <ul>
                                                                                      {employees.map(e => (
                                                                                                <li key={e.employee_id}>{e.full_name} - {e.department}</li>
                                                                                                        ))}
                                                                                                              </ul>
                                                                                                                  </div>
                                                                                                                    );
                                                                                                                    }

                                                                                                                    export default App;