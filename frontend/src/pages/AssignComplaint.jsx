import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";

export default function AssignComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch all complaints (admin only)
    axios
      .get("http://localhost:5000/complaints", {
        headers: { Authorization: token },
      })
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error(err));

    // Fetch maintenance staff (mocked / static for now)
    setStaffList([
      { id: "69f27056ed051536f8cd5721", name: "Electrician - Ravi" },
      { id: "m2", name: "Plumber - Suresh" },
    ]);
  }, []);

  const assignComplaint = async (complaintId, staffId) => {
    try {
      await axios.put(
        `http://localhost:5000/complaints/${complaintId}/assign`,
        { assignedTo: staffId },
        { headers: { Authorization: token } }
      );

      alert("Complaint assigned successfully");

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId
            ? { ...c, status: "IN_PROGRESS", assignedTo: staffId }
            : c
        )
      );
    } catch (err) {
      console.error(err);
      alert("Assignment failed");
    }
  };

  
  return (
      <>
        <NavBar />
  
        <PageContainer title="Assign Complaints">
          {complaints.length === 0 && <p>No complaints available</p>}
  
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Assign To</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c._id}>
                  <td style={tdStyle}>{c.title}</td>
                  <td style={tdStyle}>{c.status}</td>
                  <td style={tdStyle}>
                    {c.status === "OPEN" ? (
                      <select
                        defaultValue=""
                        onChange={e => assignComplaint(c._id, e.target.value)}
                      >
                        <option value="" disabled>
                          Select Staff
                        </option>
                        {staffList.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span style={{ color: "#16a34a", fontWeight: "500" }}>
                        Assigned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PageContainer>
      </>
    );
  }
  
  const thStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #e5e7eb"
  };
  
  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb"
  };

