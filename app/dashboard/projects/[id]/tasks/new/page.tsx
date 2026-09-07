"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function NewTaskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, projectId: params.id }),
      })
      if (!response.ok) throw new Error("Failed")
      router.push(`/dashboard/projects/${params.id}`)
    } catch (err) {
      setError("Failed to create task.")
    }
  }

  return (
    <div className="max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Task</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Enter task title" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Enter task description" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900">
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-4">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Create Task</button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  )
}