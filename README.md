# Kanban Board Application

## Overview
This is a **Kanban Board Application** built with **Next.js**, **TypeScript**, **React-Beautiful-DnD**, and **MongoDB**. The application allows users to create, edit, delete, and drag-and-drop tasks across different columns (To Do, In Progress, Completed). It also includes a **sidebar navigation**, **modals for task management**, and **server-side API integration** for real-time updates.

## Features
- 📌 **Add, Edit, and Delete Tasks**
- 🎯 **Drag and Drop Tasks** between columns
- 🔄 **Persistent Storage** using MongoDB
- 🌐 **API Integration** for task management
- 🎨 **Responsive UI with Dark Mode Support**
- 📂 **Modular Code Structure** for easy scalability
- 🛠 **Optimistic UI Updates**

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **State Management**: useState, useEffect
- **Drag-and-Drop**: react-beautiful-dnd
- **Icons**: Lucide-React
- **API Communication**: Fetch API

---

## Installation and Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-repo/kanban-board.git
 cd kanban-board
```

### 2️⃣ Install Dependencies
```sh
 npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### 4️⃣ Start the Development Server
```sh
 npm run dev
```
The application will be available at `http://localhost:3000`

### 5️⃣ Run the Backend Server (if applicable)
Make sure your backend is running at `http://localhost:5000`.

---

## Folder Structure
```
kanban-board/
│── components/
│   ├── kanban/
│   │   ├── sidebar-item.tsx
│   │   ├── add-task-modal.tsx
│   │   ├── task-card.tsx
│   ├── modal.tsx
│── interfaces/
│   ├── types.ts
│── api/
│   ├── api.ts
│── pages/
│   ├── index.tsx
│── public/
│── styles/
│── .env.local
│── package.json
│── tsconfig.json
│── next.config.js
│── README.md
```

---

## API Endpoints

### 🔹 Fetch All Tasks
```sh
GET /api/tasks
```
**Response:**
```json
[
  {
    "_id": "task-1",
    "title": "Create project proposal",
    "description": "Draft the initial project proposal",
    "status": "To Do"
  }
]
```

### 🔹 Create a Task
```sh
POST /api/tasks
```
**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task details",
  "status": "To Do"
}
```

### 🔹 Update Task Status
```sh
PUT /api/tasks/:id
```
**Request Body:**
```json
{
  "status": "In Progress"
}
```

### 🔹 Delete a Task
```sh
DELETE /api/tasks/:id
```

---

## Usage Guide

### 📌 Adding a Task
1. Click **Add Task** button on the header or column.
2. Enter the task details and click **Save**.
3. The task appears in the respective column.

### 🔄 Moving a Task
1. Drag and drop a task card to another column.
2. The backend updates the task status accordingly.

### ✏️ Editing a Task
1. Click the edit button on a task card.
2. Modify the title/description.
3. Click **Save Changes**.

### 🗑 Deleting a Task
1. Click the delete button on a task card.
2. Confirm deletion in the modal.

---

## Deployment
### 🚀 Deploy on Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` and follow the prompts
3. Your server will be live at `https://your-kanban-server.vercel.app`

---

## Contribution
Feel free to fork the repository, make changes, and submit a pull request. 🚀

---

## License
📜 MIT License

## Author
👤 **Your Name**
- GitHub: [@kakashihatakesh6](https://github.com/kakashihatakesh6)
- LinkedIn: [Nikhil Dasar](https://www.linkedin.com/in/nikhildasar/)
This project is licensed under the **MIT License**.

