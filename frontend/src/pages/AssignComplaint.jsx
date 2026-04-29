import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assign Complaints (Admin)</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Assign To</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.status}</td>
              <td className="border p-2">
                {c.status === "OPEN" ? (
                  <select
                    onChange={(e) => assignComplaint(c._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Staff
                    </option>
                    {staffList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>Assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
}
