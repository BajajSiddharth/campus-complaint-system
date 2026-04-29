import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

function UpdateStatus() {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints", {
        headers: { Authorization: token }
      })
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/complaints/${id}/status`,
        { status: "RESOLVED" },
        { headers: { Authorization: token } }
      );

      alert("Complaint resolved");

      setComplaints(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status: "RESOLVED" } : c
        )
      );
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <>
    <NavBar />
    <div style={{ padding: "20px" }}>
      <h2>My Assigned Complaints</h2>

      {complaints.length === 0 && <p>No assigned complaints</p>}

      <ul>
        {complaints.map(c => (
          <li key={c._id} style={{ marginBottom: "10px" }}>
            <strong>{c.title}</strong> — {c.status}

            {c.status === "IN_PROGRESS" && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => updateStatus(c._id)}
              >
                Mark as Resolved
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default UpdateStatus;
``
