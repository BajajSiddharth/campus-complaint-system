import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/complaints", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => setComplaints(res.data));
  }, []);

  const total = complaints.length;
  const open = complaints.filter(c => c.status === "OPEN").length;
  const inProgress = complaints.filter(c => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter(c => c.status === "RESOLVED").length;

  return (
    <div>
      <NavBar />
      <h2>Dashboard</h2>

      {/* Summary */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div><strong>Total</strong><div>{total}</div></div>
        <div><strong>Open</strong><div>{open}</div></div>
        <div><strong>In Progress</strong><div>{inProgress}</div></div>
        <div><strong>Resolved</strong><div>{resolved}</div></div>
      </div>

      {/* List */}
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
