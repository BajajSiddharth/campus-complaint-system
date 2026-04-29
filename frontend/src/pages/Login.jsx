import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


// import axios from "axios";

// function Login() {
//   const login = async () => {
//     const response = await axios.post(
//       "http://localhost:4000/auth/login",
//       {
//         email: "admin@campus.edu",
//         password: "admin123"
//       }
//     );

//     localStorage.setItem("token", response.data.token);
//     console.log("Login success, token stored");
//     window.location.href = "/dashboard";

    
//   };

//   return <button onClick={login}>Login</button>;
// }

// export default Login;
