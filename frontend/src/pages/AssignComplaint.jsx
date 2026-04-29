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
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          {/* same table logic */}
        </table>
      </PageContainer>
    </>
  );

}
