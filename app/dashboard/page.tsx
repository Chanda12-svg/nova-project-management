import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const projectCount = await db.project.count({ where: { ownerId: session.user?.id } })
  const taskCount = await db.task.count()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{projectCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{taskCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active Projects</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {await db.project.count({ where: { ownerId: session.user?.id, status: "ACTIVE" } })}
          </p>
        </div>
      </div>
    </div>
  )
}