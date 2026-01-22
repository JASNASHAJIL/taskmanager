import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-black/90  shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-200">Task Manager</h1>
      <button
        onClick={logout}
        className="bg-red-600 text-gray-200 px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
