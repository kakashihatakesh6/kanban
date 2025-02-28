import type { KanbanData } from "./types"

// Initial dummy data
export const initialData: KanbanData = {
  tasks: {
    "task-1": {
      _id: "task-1",
      title: "Create project proposal",
      description: "Draft the initial project proposal for client review",
      dueDate: "2023-07-15",
      assignee: "Alex Johnson",
      priority: "High",
      status: "To Do",
    },
    "task-2": {
      _id: "task-2",
      title: "Design homepage mockup",
      description: "Create wireframes and visual design for the homepage",
      dueDate: "2023-07-18",
      assignee: "Sarah Miller",
      priority: "Medium",
      status: "In Progress",
    },
    "task-3": {
      _id: "task-3",
      title: "Implement authentication",
      description: "Set up user authentication and authorization system",
      dueDate: "2023-07-20",
      assignee: "David Chen",
      priority: "High",
      status: "In Progress",
    },
    "task-4": {
      _id: "task-4",
      title: "Database schema design",
      description: "Design and document the database schema",
      dueDate: "2023-07-16",
      assignee: "Emily Wong",
      priority: "Medium",
      status: "To Do",
    },
    "task-5": {
      _id: "task-5",
      title: "API documentation",
      description: "Create comprehensive API documentation",
      dueDate: "2023-07-22",
      assignee: "Michael Brown",
      priority: "Low",
      status: "To Do",
    },
    "task-6": {
      _id: "task-6",
      title: "Unit testing",
      description: "Write unit tests for core functionality",
      dueDate: "2023-07-25",
      assignee: "Alex Johnson",
      priority: "Medium",
      status: "Completed",
    },
    "task-7": {
      _id: "task-7",
      title: "Performance optimization",
      description: "Optimize application performance and loading times",
      dueDate: "2023-07-28",
      assignee: "Sarah Miller",
      priority: "Low",
      status: "Completed",
    },
    "task-8": {
      _id: "task-8",
      title: "Responsive design",
      description: "Ensure the application is fully responsive on all devices",
      dueDate: "2023-07-21",
      assignee: "David Chen",
      priority: "High",
      status: "In Progress",
    },
  },
  columns: {
    "column-1": {
      _id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-4", "task-5"],
    },
    "column-2": {
      _id: "column-2",
      title: "In Progress",
      taskIds: ["task-2", "task-3", "task-8"],
    },
    "column-3": {
      _id: "column-3",
      title: "Completed",
      taskIds: ["task-6", "task-7"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
}

