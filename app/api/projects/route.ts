import { NextResponse } from "next/server"
import { auth } from "../../../auth"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  console.log("🔵 POST /api/projects - STARTED")
  
  try {
    console.log("🔵 Checking authentication...")
    const session = await auth()
    console.log("🔵 Session:", session)
    
    if (!session || !session.user?.id) {
      console.error("🔴 Unauthorized - No session or user ID")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("🔵 Parsing request body...")
    const body = await request.json()
    console.log("🔵 Body:", body)
    
    const { name, description, status } = body

    console.log(" Creating project in database...")
    console.log("🔵 User ID:", session.user.id)
    
    const project = await db.project.create({
      data: {
        name,
        description,
        status,
        ownerId: session.user.id,
      },
    })

    console.log("✅ Project created successfully:", project)
    return NextResponse.json(project, { status: 201 })
    
  } catch (error) {
    console.error("🔴 ERROR creating project:", error)
    console.error("🔴 Error details:", JSON.stringify(error, null, 2))
    return NextResponse.json({ 
      error: "Failed to create project",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projects = await db.project.findMany({
      where: { ownerId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}