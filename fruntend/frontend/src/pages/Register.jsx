import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="p-3 flex items-center justify-center min-h-screen bg-linear-to-r from-[#7ef29d] to-[#0f68a9]">
            <form
                className="bg-slate-100/85 backdrop-blur-md
           shadow-2xl shadow-black/60
           p-5 sm:p-8 rounded-xl w-96 text-slate-900"
                onSubmit={submit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    className="w-full p-3 mb-4 border border-slate-400 rounded"
                    placeholder="Name"
                    value={form.name} // <-- add value
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="w-full p-3 mb-4 border border-slate-400 rounded"
                    placeholder="Email"
                    value={form.email} // <-- add value
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    className="w-full p-3 mb-4 border border-slate-400 rounded"
                    placeholder="Password"
                    value={form.password} // <-- add value
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="w-full bg-green-600 text-white py-2 rounded">
                    Register
                </button>

                <div>
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
