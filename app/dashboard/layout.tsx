import { ReactNode } from "react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">NOVA</h1>
        </div>
        <nav className="mt-6 px-3">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-4 py-3 bg-gray-800 text-white">
            Dashboard
          </Link>
          <Link href="/dashboard/projects" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 mt-2">
            Projects
          </Link>
        </nav>
      </aside>
      <main className="flex-1">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Project Management</h2>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Sign Out
              </button>
            </form>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}