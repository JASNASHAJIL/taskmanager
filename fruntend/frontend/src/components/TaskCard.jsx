export default function TaskCard({ task, onToggle, onDelete , onEdit }) {
  return (
    <div className="flex justify-between items-center bg-gray-700 p-3 rounded mb-2">
      <span className={task.completed ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>

      <div className="space-x-3">
        <button
          onClick={onToggle}
          className="text-green-600 font-bold"
        >
          ✓
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 font-bold"
        >
          ✕
        </button>
        <button
          onClick={onEdit}
          className="text-red-600 font-bold"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}
