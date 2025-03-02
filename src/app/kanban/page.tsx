/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Calendar, Home, LayoutDashboard, LogOut, Menu, MessageSquare, Plus, Settings, User, X } from "lucide-react"

import type { KanbanData, Task } from "../../interfaces/types"
import { initialData } from "../../interfaces/dummydata"
import { updateTaskStatus } from "../../api/api"
import { SidebarItem } from "@/components/kanban/sidebar-item"
import { AddTaskModal } from "@/components/kanban/add-task-modal"
import { TaskCard } from "@/components/kanban/task-card" 


export default function KanbanBoard() {
    const [data, setData] = useState<KanbanData>(initialData)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const [activeColumn, setActiveColumn] = useState<string>("column-1")
    // console.log(first)


    // Fetch data on component mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                // const kanbanData = await fetchKanbanData()
                const kanbanData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });
                const response = await kanbanData.json()

                const tasksObject = response.reduce((acc: any, task: any) => {
                    acc[task._id] = task;
                    return acc;
                }, {});

                const reqColumns = {
                    "column-1": {
                        _id: "column-1",
                        title: "To Do",
                        taskIds: response.filter((task: any) => task.status === "To Do").map((task: any) => task._id),
                    },
                    "column-2": {
                        _id: "column-2",
                        title: "In Progress",
                        taskIds: response.filter((task: any) => task.status === "In Progress").map((task: any) => task._id),
                    },
                    "column-3": {
                        _id: "column-3",
                        title: "Completed",
                        taskIds: response.filter((task: any) => task.status === "Completed").map((task: any) => task._id),
                    }
                };

                const mydata = {
                    tasks: tasksObject,
                    columns: reqColumns,
                    columnOrder: ["column-1", "column-2", "column-3"],
                }

                console.log("mydata =>", mydata, tasksObject)
                if (kanbanData) {
                    setData(mydata)
                }

                setError(null)
            } catch (err) {
                console.error("Failed to fetch kanban data:", err)
                setError("Failed to load data. Using fallback data instead.")
                // Keep using the initial data as fallback
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result

        // If there's no destination or if the item was dropped back in the same place
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return
        }

        // Create a copy of the current data to work with
        const newData = { ...data }

        // If moving within the same column
        if (source.droppableId === destination.droppableId) {
            const column = newData.columns[source.droppableId]
            const newTaskIds = Array.from(column.taskIds)

            // Remove the task from its old position
            newTaskIds.splice(source.index, 1)
            // Insert the task at its new position
            newTaskIds.splice(destination.index, 0, draggableId)

            // Update the column with the new taskIds
            newData.columns[source.droppableId] = {
                ...column,
                taskIds: newTaskIds,
            }
        } else {
            // Moving from one column to another
            const sourceColumn = newData.columns[source.droppableId]
            const destinationColumn = newData.columns[destination.droppableId]

            // Remove from source column
            const sourceTaskIds = Array.from(sourceColumn.taskIds)
            sourceTaskIds.splice(source.index, 1)

            // Add to destination column
            const destinationTaskIds = Array.from(destinationColumn.taskIds)
            destinationTaskIds.splice(destination.index, 0, draggableId)

            // Update columns
            newData.columns[source.droppableId] = {
                ...sourceColumn,
                taskIds: sourceTaskIds,
            }

            newData.columns[destination.droppableId] = {
                ...destinationColumn,
                taskIds: destinationTaskIds,
            }

            // Update task status based on the destination column
            const newStatus = getStatusFromColumnId(destination.droppableId)

            // Update the task status in our local data
            newData.tasks[draggableId] = {
                ...newData.tasks[draggableId],
                status: newStatus,
            }

            // Update the task status on the server
            try {
                await updateTaskStatus(draggableId, newStatus)
            } catch (err) {
                // If the server update fails, we could revert the UI change
                // or show an error message, but for now we'll just log it
                console.error("Failed to update task status on server:", err)
            }
        }

        // Update state with the new data
        setData(newData)
    }

    // Helper function to get status from column ID
    const getStatusFromColumnId = (columnId: string): "To Do" | "In Progress" | "Completed" => {
        switch (columnId) {
            case "column-1":
                return "To Do"
            case "column-2":
                return "In Progress"
            case "column-3":
                return "Completed"
            default:
                return "To Do"
        }
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleAddTaskClick = (columnId: string) => {
        setActiveColumn(columnId)
        setIsAddTaskModalOpen(true)
    }

    // const handleAddTask = async (taskData: Omit<Task, "_id">) => {
    //     try {
    //         // Create task on the server and get the new ID
    //         const newTaskId = await createTask(taskData)

    //         // Create a new task object with the ID
    //         const newTask: Task = {
    //             _id: newTaskId,
    //             ...taskData,
    //         }

    //         // Update our local state
    //         const newData = { ...data }

    //         // Add the task to our tasks object
    //         newData.tasks[newTaskId] = newTask

    //         // Add the task ID to the appropriate column
    //         const columnId = getColumnIdFromStatus(taskData.status)
    //         newData.columns[columnId].taskIds.push(newTaskId)

    //         // Update state
    //         setData(newData)

    //         return Promise.resolve()
    //     } catch (err) {
    //         console.error("Failed to add task:", err)
    //         return Promise.reject(err)
    //     }
    // }

    const handleAddTask = async (taskData: Omit<Task, "_id">) => {
        try {
            // Make an API call to create the task on the server
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to create task");
            }
    
            const newDBTask = await response.json(); // Assuming the response returns the new task ID
            console.log("new tak =>", newDBTask)
            // Create a new task object with the ID
            const newTask: Task = {
                _id: newDBTask._id,
                ...taskData,
            };
    
            // Update our local state
            setData((prevData) => {
                const newData = { ...prevData };
    
                // Add the task to our tasks object
                newData.tasks[newDBTask._id] = newTask;
    
                // Add the task ID to the appropriate column
                const columnId = getColumnIdFromStatus(taskData.status);
                newData.columns[columnId].taskIds.push(newDBTask._id);
    
                return newData;
            });
    
            return Promise.resolve();
        } catch (err) {
            console.error("Failed to add task:", err);
            return Promise.reject(err);
        }
    };
    

    // Helper function to get column ID from status
    const getColumnIdFromStatus = (status: "To Do" | "In Progress" | "Completed"): string => {
        switch (status) {
            case "To Do":
                return "column-1"
            case "In Progress":
                return "column-2"
            case "Completed":
                return "column-3"
            default:
                return "column-1"
        }
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`${sidebarOpen ? "w-64" : "w-20"} bg-indigo-900 text-white transition-all duration-300 ease-in-out flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between border-b border-indigo-800">
                    <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>KanbanBoard</h1>
                    <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-indigo-800">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />} 
                    </button>
                </div>

                <nav className="flex-1 pt-4">
                    <SidebarItem icon={<Home size={20} />} text="Home" active={false} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={true} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<Calendar size={20} />} text="Calendar" active={false} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<MessageSquare size={20} />} text="Messages" active={false} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<User size={20} />} text="Team" active={false} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<Settings size={20} />} text="Settings" active={false} collapsed={!sidebarOpen} />
                </nav>

                <div className="p-4 border-t border-indigo-800">
                    <SidebarItem icon={<LogOut size={20} />} text="Logout" active={false} collapsed={!sidebarOpen} />
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-800">Kanban Board</h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleAddTaskClick("column-1")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
                            >
                                <Plus size={18} />
                                <span>Add Task</span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                                AJ
                            </div>
                        </div>
                    </div>
                </header>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <svg
                                className="animate-spin h-10 w-10 text-indigo-600 mb-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <p className="text-gray-600">Loading your tasks...</p>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !isLoading && (
                    <div className="bg-red-50 p-4 m-6 rounded-md border border-red-200">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Kanban board */}
                {!isLoading && (
                    <main className="flex-1 overflow-x-auto p-6 bg-gray-50 flex">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex space-x-6 h-full">
                                {data.columnOrder.map((columnId) => {
                                    const column = data.columns[columnId]
                                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

                                    return (
                                        <div key={column._id} className="w-80 flex-shrink-0">
                                            <div className="bg-gray-100 rounded-md shadow-sm">
                                                <div className="p-4 font-semibold text-gray-700 border-b border-gray-200 flex items-center justify-between">
                                                    <h2 className="flex items-center">
                                                        {column.title}
                                                        <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                                                            {column.taskIds.length}
                                                        </span>
                                                    </h2>
                                                    <button
                                                        onClick={() => handleAddTaskClick(column._id)}
                                                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                                        title={`Add task to ${column.title}`}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <Droppable droppableId={column._id}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={`p-3 min-h-[calc(100vh-13rem)] ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                                                        // className={`p-3 min-h-screen ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                                                        >
                                                            {tasks.map((task, index) => (

                                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={snapshot.isDragging ? "shadow-md" : ""}
                                                                        >
                                                                            <TaskCard task={task} />
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </DragDropContext>
                    </main>
                )}
            </div>

            {/* Add Task Modal */}
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                onAddTask={handleAddTask}
                columnId={activeColumn}
            />
        </div>
    )
}

