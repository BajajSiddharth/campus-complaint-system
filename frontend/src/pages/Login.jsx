import axios from "axios";

function Login() {
  const login = async () => {
    const response = await axios.post(
      "http://localhost:4000/auth/login",
      {
        email: "admin@campus.edu",
        password: "admin123"
      }
    );

    localStorage.setItem("token", response.data.token);
    window.location.href = "/dashboard";
  };

  return <button onClick={login}>Login</button>;
}

export default Login;
``
