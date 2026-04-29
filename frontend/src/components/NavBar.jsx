function NavBar() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => window.location.href = "/dashboard"}>
        Dashboard
      </button>

      {(role === "STUDENT" || role === "STAFF") && (
        <button onClick={() => window.location.href = "/create-complaint"}>
          Create Complaint
        </button>
      )}

      {role === "ADMIN" && (
        <button onClick={() => window.location.href = "/assign-complaints"}>
          Assign Complaints
        </button>
      )}

      {role === "MAINTENANCE" && (
        <button onClick={() => window.location.href = "/update-status"}>
          Update Status
        </button>
      )}

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
