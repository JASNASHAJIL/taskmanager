import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [edited, setEdited] = useState(false);
    const [editedId, setEditedId] = useState("");
    const [editedText, setEditedText] = useState("");
    const [filter, setFilter] = useState("all");

    const loadTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    const addTask = async () => {
        if (edited) {
            await API.put(`/tasks/${editedId}`, { title: editedText });
            setEdited(false);
            setEditedId("");
            setEditedText("");
            loadTasks();
            return;
        }
        await API.post("/tasks", { title });
        setTitle("");
        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />

            <div className="max-w-3xl mx-auto mt-8 bg-black/90 text-gray-200 p-6 rounded-lg shadow min-h-[75vh]">
                <h2 className="text-xl font-bold mb-4">My Tasks</h2>

                {/* Add / Edit Task */}
                <div className="flex mb-4">
                    <input
                        className="flex-1 border p-2 mr-2 w-full border-slate-400 rounded"
                        placeholder="Add new task"
                        value={edited ? editedText : title}
                        onChange={(e) =>
                            edited
                                ? setEditedText(e.target.value)
                                : setTitle(e.target.value)
                        }
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 rounded"
                    >
                        {edited ? "Update" : "Add"}
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1 rounded text-sm ${
                            filter === "all"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-200"
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-3 py-1 rounded text-sm ${
                            filter === "pending"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-200"
                        }`}
                    >
                        Pending
                    </button>

                    <button
                        onClick={() => setFilter("completed")}
                        className={`px-3 py-1 rounded text-sm ${
                            filter === "completed"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-200"
                        }`}
                    >
                        Completed
                    </button>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onToggle={() =>
                                    API.put(`/tasks/${task._id}`, {
                                        completed: !task.completed,
                                    }).then(loadTasks)
                                }
                                onDelete={() =>
                                    API.delete(`/tasks/${task._id}`).then(
                                        loadTasks
                                    )
                                }
                                onEdit={() => {
                                    setEdited(true);
                                    setEditedId(task._id);
                                    setEditedText(task.title);
                                }}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center min-h-[40vh]">
                            <span>No tasks</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
