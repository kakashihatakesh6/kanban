// Define types for our Kanban board data
export interface Task {
    _id: string
    title: string
    description: string
    dueDate: string
    assignee: string
    priority: "High" | "Medium" | "Low"
    status: "To Do" | "In Progress" | "Completed"
    createdAt?: string | ''
  }
  
  export interface Column {
    _id: string
    title: string
    taskIds: string[]
  }
  
  export interface KanbanData {
    tasks: {
      [key: string]: Task
    }
    columns: {
      [key: string]: Column
    }
    columnOrder: string[]
  }
  
  export interface TaskData {
    title: string,
    description: string
  }