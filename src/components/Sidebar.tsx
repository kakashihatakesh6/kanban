import Link from "next/link"
import { Home, KanbanIcon as LayoutKanban, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/kanban" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <LayoutKanban size={20} />
              <span>Kanban Board</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

