import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => setComplaints(res.data));
  }, []);

  return (
    <div>
      <h2>Complaints</h2>
      <button onClick={() => window.location.href = "/create-complaint"}>
          Create New Complaint
      </button>
      <ul>
        {complaints.map(c => (
          <li key={c._id}>
            {c.title} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
