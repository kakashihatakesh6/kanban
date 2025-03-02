import type { KanbanData } from "../interfaces/types"
import { initialData } from "../interfaces/dummydata"

// Simulate API calls with a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch kanban data from server
export async function fetchKanbanData(): Promise<KanbanData> {
  try {
    // Simulate API call
    await delay(1000)

    // In a real app, you would fetch from an actual API endpoint
    // const response = await fetch('/api/kanban');
    // if (!response.ok) throw new Error('Failed to fetch kanban data');
    // return await response.json();

    // For demo purposes, return the dummy data
    return initialData
  } catch (error) {
    console.error("Error fetching kanban data:", error)
    throw error
  }
}

// Update task status on the server
export async function updateTaskStatus(
  taskId: string,
  newStatus: "To Do" | "In Progress" | "Completed",
): Promise<void> {
  try {
    // Simulate API call
    await delay(500)

    // In a real app, you would make a PUT/PATCH request
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!response.ok) throw new Error('Failed to update task status');

    console.log(`Task ${taskId} status updated to ${newStatus}`)
  } catch (error) {
    console.error("Error updating task status:", error)
    throw error
  }
}

// Create a new task on the server
export async function createTask(taskData: Omit<KanbanData["tasks"][string], "_id">): Promise<string> {
  try {
    // Simulate API call
    console.log(taskData)
    await delay(700)

    // In a real app, you would make a POST request
    // const response = await fetch('/api/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(taskData)
    // });
    // if (!response.ok) throw new Error('Failed to create task');
    // const data = await response.json();
    // return data.id;

    // For demo purposes, generate a random ID
    const newId = `task-${Date.now()}`
    console.log(`New task created with ID: ${newId}`)
    return newId
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

