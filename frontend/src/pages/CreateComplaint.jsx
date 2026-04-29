import { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";

function CreateComplaint() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/complaints",
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Complaint created successfully");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Failed to create complaint");
    }
  };

  return (
    <>
      <NavBar />

      <PageContainer title="Create Complaint">
        <form onSubmit={handleSubmit}>
          <FormField label="Title">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField label="Category">
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Electrical / Plumbing / Network"
              required
            />
          </FormField>

          <FormField label="Priority">
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </FormField>

          <FormField label="Location">
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Hostel / Block / Room"
              required
            />
          </FormField>

          <FormField label="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </FormField>

          <button
            type="submit"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Submit Complaint
          </button>
        </form>
      </PageContainer>
    </>
  );
}

/* ---------- Reusable Form Field ---------- */

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "500"
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default CreateComplaint;
