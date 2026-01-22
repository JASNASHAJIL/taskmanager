import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login error:", err);
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="p-3 flex items-center justify-center min-h-screen bg-linear-to-r from-[#7ef29d] to-[#0f68a9]">
            <form
                onSubmit={submit}
                className="bg-slate-100/85 backdrop-blur-md
                shadow-2xl shadow-black/60
                p-5 sm:p-8 rounded-xl w-96 text-slate-900"
            >
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center font-mono">
                    Login
                </h1>

                {error && (
                    <p className="text-red-500 mb-4 text-center">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full p-3 mb-4 border border-slate-400 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                    className="w-full p-3 mb-4 border border-slate-400 rounded"
                />

                <div className="flex justify-center w-full">
                    <button
                        className="w-full bg-green-600 text-white py-2 rounded"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>

                <div>
                    <p className="text-center mt-4">
                        No account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
