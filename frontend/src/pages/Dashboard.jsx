import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

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
