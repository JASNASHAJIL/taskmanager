import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // <-- error state
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const res = await API.post("/auth/register", form);
      console.log(res.data); // optional: see response
      navigate("/"); // redirect on success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          className="w-full border p-2 mb-4"
          placeholder="Name"
          value={form.name}   // <-- add value
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          value={form.email}  // <-- add value
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={form.password} // <-- add value
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
