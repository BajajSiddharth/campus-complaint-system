import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import AssignComplaint from "./pages/AssignComplaint";
import UpdateStatus from "./pages/UpdateStatus";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-complaint" element={<CreateComplaint />} />
      <Route path="/assign-complaints" element={<AssignComplaint />} />
      <Route path="/update-status" element={<UpdateStatus />} />
    </Routes>
  );
}

export default App;
