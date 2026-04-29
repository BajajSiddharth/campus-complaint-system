import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";

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
      <PageContainer title="My Assigned Complaints">
        {complaints.map(c => (
          <div
            key={c._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            {c.status === "IN_PROGRESS" && (
              <button
                onClick={() => updateStatus(c._id)}
                style={{
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </PageContainer>
    </>
  );

}

export default UpdateStatus;
``
