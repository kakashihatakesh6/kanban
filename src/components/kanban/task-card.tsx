import { Clock } from "lucide-react"
import type { Task } from "../../interfaces/types"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  // Determine border color based on priority
  const borderColor =
    task.priority === "High" ? "border-red-500" : task.priority === "Medium" ? "border-yellow-500" : "border-green-500"

  return (
    <div
      className={`bg-white p-4 mb-3 rounded-md shadow-sm border-l-4 ${borderColor} hover:shadow-md transition-shadow`}
    >
      <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-500">
          <Clock size={14} className="mr-1" />
          {/* <span>{task.dueDate}</span> */}
          <span>{task.dueDate}</span>
        </div>
        <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{task.assignee}</div>
      </div>
    </div>
  )
}

