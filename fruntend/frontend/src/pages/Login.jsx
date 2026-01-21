import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-primary text-white py-2 rounded">
          Login
        </button>

        <p className="text-center mt-4">
          No account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
