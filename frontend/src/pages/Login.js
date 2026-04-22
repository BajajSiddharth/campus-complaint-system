import { authApi } from "../services/api";

export default function Login() {
  const login = async () => {
    const res = await authApi.post("/auth/login", {
      email: "student@test.com",
      password: "123"
    });
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return <button onClick={login}>Login</button>;
}
