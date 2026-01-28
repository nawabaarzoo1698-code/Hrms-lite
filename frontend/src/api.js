const API_BASE_URL = "https://hrms-lite-backend-lp8e.onrender.com";

/* EMPLOYEES */
export const getEmployees = async () => {
  const res = await fetch(`${API_BASE_URL}/employees`);
    return res.json();
    };

    export const addEmployee = async (data) => {
      const res = await fetch(`${API_BASE_URL}/employees`, {
          method: "POST",
              headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                    });
                      return res.json();
                      };