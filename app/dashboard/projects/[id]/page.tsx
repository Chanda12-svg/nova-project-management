import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"
import TaskCard from "@/components/TaskCard"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const project = await db.project.findUnique({
    where: { id },
    include: { tasks: { orderBy: { createdAt: "asc" } } },
  })

  if (!project) return <div className="p-6">Project not found</div>

  const todoTasks = project.tasks.filter((t) => t.status === "TODO")
  const inProgressTasks = project.tasks.filter((t) => t.status === "IN_PROGRESS")
  const doneTasks = project.tasks.filter((t) => t.status === "DONE")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/dashboard/projects" className="text-blue-600 hover:underline text-sm">← Back to Projects</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        <Link href={`/dashboard/projects/${id}/tasks/new`} className="px-4 py-2 bg-blue-600 text-white rounded-lg">+ New Task</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn title="To Do" status="TODO" tasks={todoTasks} color="bg-gray-400" />
        <KanbanColumn title="In Progress" status="IN_PROGRESS" tasks={inProgressTasks} color="bg-blue-500" />
        <KanbanColumn title="Done" status="DONE" tasks={doneTasks} color="bg-green-500" />
      </div>
    </div>
  )
}

function KanbanColumn({ title, status, tasks, color }: any) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[500px]">
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span className={`w-3 h-3 ${color} rounded-full`}></span> {title} ({tasks.length})
      </h3>
      <div className="space-y-3">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} currentStatus={status} />
        ))}
        {tasks.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No tasks</p>}
      </div>
    </div>
  )
}