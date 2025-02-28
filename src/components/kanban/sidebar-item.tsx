import type React from "react"
import { CheckCircle } from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  active: boolean
  collapsed: boolean
}

export function SidebarItem({ icon, text, active, collapsed }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center px-4 py-3 ${active ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800 hover:text-white"} transition-colors cursor-pointer`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      {!collapsed && <span className="ml-3">{text}</span>}
      {active && !collapsed && (
        <div className="ml-auto">
          <CheckCircle size={16} />
        </div>
      )}
    </div>
  )
}

