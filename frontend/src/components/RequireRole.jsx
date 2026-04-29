import { Navigate } from "react-router-dom";

function RequireRole({ allowedRoles, children }) {
  const role = localStorage.getItem("role");

  // 1. Handle case where role is null or doesn't match
  if (!role || !allowedRoles.includes(role)) {
    // Option A: Redirect to login (Better UX)
    return <Navigate to="/" replace />;
    
    /* Option B: Show a message (What you had)
    return <p>Access Denied</p>; 
    */
  }

  // 2. Return the children if the role is allowed
  return children;
}

export default RequireRole;


// function RequireRole({ allowedRoles, children }) {
//   const role = localStorage.getItem("role");

//   if (!allowedRoles.includes(role)) {
//     return <p>Access Denied</p>
