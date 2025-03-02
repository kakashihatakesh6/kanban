import { Clock, Edit, Trash2 } from "lucide-react";
import type { Task } from "../../interfaces/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // Determine border color based on priority
  const borderColor =
    task.priority === "High"
      ? "border-red-500"
      : task.priority === "Medium"
      ? "border-yellow-500"
      : "border-green-500";

  return (
    <div
      className={`bg-white p-4 mb-3 rounded-md shadow-sm border-l-4 ${borderColor} hover:shadow-md transition-shadow relative`}
    >
      {/* Edit and Delete Icons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-blue-600">
          <Edit size={18} />
        </button>
        <button onClick={() => onDelete(task)} className="text-gray-500 hover:text-red-600">
          <Trash2 size={18} />
        </button>
      </div>

      <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{task.dueDate}</span>
        </div>
        <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{task.assignee}</div>
      </div>
    </div>
  );
}
