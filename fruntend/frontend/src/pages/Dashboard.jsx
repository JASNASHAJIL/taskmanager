import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>

        <div className="flex mb-4">
          <input
            className="flex-1 border p-2 mr-2"
            placeholder="Add new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-primary text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={() =>
              API.put(`/tasks/${task._id}`, { completed: !task.completed }).then(loadTasks)
            }
            onDelete={() =>
              API.delete(`/tasks/${task._id}`).then(loadTasks)
            }
          />
        ))}
      </div>
    </>
  );
}
