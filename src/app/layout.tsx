import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Kanban Board",
  description: "A responsive Kanban board with drag and drop functionality",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {/* <body className={inter.className}> */}
        {/* <Sidebar /> */}
        {children}
      </body>
    </html>
  )
}

