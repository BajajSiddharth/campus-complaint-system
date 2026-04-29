function NavBar() {
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#1f2937", // dark gray
        color: "#ffffff",
        marginBottom: "24px",
        borderRadius: "8px"
      }}
    >
      {/* App Title */}
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        Campus Maintenance System
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "16px" }}>
        <NavButton label="Dashboard" path="/dashboard" />

        {(role === "STUDENT" || role === "STAFF") && (
          <NavButton label="Create Complaint" path="/create-complaint" />
        )}

        {role === "ADMIN" && (
          <NavButton label="Assign Complaints" path="/assign-complaints" />
        )}

        {role === "MAINTENANCE" && (
          <NavButton label="Update Status" path="/update-status" />
        )}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={logoutStyle}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function NavButton({ label, path }) {
  return (
    <button
      onClick={() => window.location.href = path}
      style={navButtonStyle}
    >
      {label}
    </button>
  );
}

const navButtonStyle = {
  background: "transparent",
  border: "1px solid #9ca3af",
  color: "#ffffff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

const logoutStyle = {
  backgroundColor: "#dc2626",
  border: "none",
  color: "#ffffff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default NavBar;
