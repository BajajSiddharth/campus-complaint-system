import { api } from "../services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.get("/complaints", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setComplaints(res.data));
  }, []);

  return (
    <ul>
      {complaints.map(c => (
        <li key={c._id}>{c.title} - {c.status}</li>
      ))}
    </ul>
  );
}
