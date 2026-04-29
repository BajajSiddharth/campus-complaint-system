import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SummaryCard from "./components/SummaryCard";

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
      
      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "24px"
        }}
      >
        <SummaryCard title="Total Complaints" value={total} color="#2563eb" />
        <SummaryCard title="Open" value={open} color="#dc2626" />
        <SummaryCard title="In Progress" value={inProgress} color="#d97706" />
        <SummaryCard title="Resolved" value={resolved} color="#16a34a" />
      </div>

      <div style={{ background: "#ffffff", borderRadius: "8px", padding: "16px" }}>
          <h3 style={{ marginBottom: "12px" }}>Complaints</h3>

          {complaints.length === 0 && <p>No complaints found</p>}

          {complaints.map(c => (
            <div
              key={c._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #e5e7eb"
              }}
            >
              <span>{c.title}</span>
              <span style={{ fontWeight: "bold" }}>{c.status}</span>
            </div>
          ))}
        </div>

      /* {/* List */}
      <ul>
        {complaints.map(c => (
          <li key={c._id}>
            {c.title} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  ); */
}

export default Dashboard;
