const API_URL = "http://localhost:8000";

export const getEmployees = async () => {
  const res = await fetch(`${API_URL}/employees`);
    return res.json();
    };

    export const addEmployee = async (employee) => {
      const res = await fetch(`${API_URL}/employees`, {
          method: "POST",
              headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(employee),
                    });
                      return res.json();
                      };
