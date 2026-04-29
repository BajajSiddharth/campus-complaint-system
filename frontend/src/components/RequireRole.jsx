function RequireRole({ allowedRoles, children }) {
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <p>Access Denied</p
