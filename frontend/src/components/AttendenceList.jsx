import { useState } from "react";
import api from "../api/api";

export default function AttendanceList() {
  const [employeeId, setEmployeeId] = useState("");
    const [records, setRecords] = useState([]);

      const fetchRecords = async () => {
          const res = await api.get(`/attendance/${employeeId}`);
              setRecords(res.data);
                };

                  return (
                      <div>
                            <h3>Attendance Records</h3>

                                  <input placeholder="Employee ID" onChange={(e) => setEmployeeId(e.target.value)} />
                                        <button onClick={fetchRecords}>View</button>

                                              <ul>
                                                      {records.map((r, i) => (
                                                                <li key={i}>
                                                                            {r.date} - {r.status}
                                                                                      </li>
                                                                                              ))}
                                                                                                    </ul>
                                                                                                        </div>
                                                                                                          );
                                                                                                          }