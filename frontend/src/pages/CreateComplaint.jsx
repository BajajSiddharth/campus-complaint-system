import { useState } from "react";
import { complaintApi } from "../services/api";
import NavBar from "../components/NavBar";

function CreateComplaint() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await complaintApi.post(
        "/complaints",
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Complaint created successfully");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Failed to create complaint");
    }
  };

  return (
    <>
    <NavBar />
    <div style={{ padding: "20px" }}>
      <h2>Create Complaint</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="category"
          placeholder="Category (Electrical / Plumbing)"
          onChange={handleChange}
          required
        /><br /><br />

        <select name="priority" onChange={handleChange} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select><br /><br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Describe the issue"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
    </>
  );
}

export default CreateComplaint;
