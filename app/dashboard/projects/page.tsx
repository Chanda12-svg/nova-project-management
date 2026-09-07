import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"

export default async function ProjectsPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const projects = await db.project.findMany({
    where: { ownerId: session.user?.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { tasks: true } } },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Link href="/dashboard/projects/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">You don't have any projects yet.</p>
          <Link href="/dashboard/projects/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.description || "No description"}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{project.status}</span>
                <span className="text-gray-500">{project._count.tasks} tasks</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}