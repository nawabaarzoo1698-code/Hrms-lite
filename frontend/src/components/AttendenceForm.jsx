import { useState } from "react";
import api from "../api/api";

export default function AttendanceForm() {
  const [data, setData] = useState({
      employee_id: "",
          date: "",
              status: "Present",
                });

                  const submit = async () => {
                      try {
                            await api.post("/attendance", data);
                                  alert("Attendance marked");
                                      } catch {
                                            alert("Error marking attendance");
                                                }
                                                  };

                                                    return (
                                                        <div>
                                                              <h3>Mark Attendance</h3>

                                                                    <input
                                                                            placeholder="Employee ID"
                                                                                    onChange={(e) => setData({ ...data, employee_id: e.target.value })}
                                                                                          />

                                                                                                <input
                                                                                                        type="date"
                                                                                                                onChange={(e) => setData({ ...data, date: e.target.value })}
                                                                                                                      />

                                                                                                                            <select onChange={(e) => setData({ ...data, status: e.target.value })}>
                                                                                                                                    <option>Present</option>
                                                                                                                                            <option>Absent</option>
                                                                                                                                                  </select>

                                                                                                                                                        <button onClick={submit}>Submit</button>
                                                                                                                                                            </div>
                                                                                                                                                              );
                                                                                                                                                              }