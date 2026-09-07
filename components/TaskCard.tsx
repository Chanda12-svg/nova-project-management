"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TaskCard({ task, currentStatus }: any) {
  const [isMoving, setIsMoving] = useState(false)
  const router = useRouter()

  const moveTask = async (newStatus: string) => {
    setIsMoving(true)
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh() // Refresh the page to show the updated board
    } catch (error) {
      console.error("Failed to move task")
    } finally {
      setIsMoving(false)
    }
  }

  const deleteTask = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
      router.refresh()
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
      <h4 className="font-medium text-gray-900">{task.title}</h4>
      <p className="text-sm text-gray-500 mt-1 mb-3">{task.description}</p>
      
      <div className="flex gap-2 flex-wrap">
        {currentStatus !== "TODO" && (
          <button 
            onClick={() => moveTask("TODO")} 
            disabled={isMoving}
            className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            To Do
          </button>
        )}
        {currentStatus !== "IN_PROGRESS" && (
          <button 
            onClick={() => moveTask("IN_PROGRESS")} 
            disabled={isMoving}
            className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            In Progress
          </button>
        )}
        {currentStatus !== "DONE" && (
          <button 
            onClick={() => moveTask("DONE")} 
            disabled={isMoving}
            className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
          >
            Done
          </button>
        )}
        <button 
          onClick={deleteTask} 
          className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  )
}