# NOVA - Project Management Platform

A modern, full-stack project management application with Kanban board functionality.

## 📋 Description

**NOVA** is a comprehensive project management web application built with cutting-edge technologies. It helps teams organize, track, and manage their work efficiently through an intuitive Kanban-style interface.

## ✨ Features

- **User Authentication** - Secure login with JWT tokens
- **Project Management** - Create and manage multiple projects
- **Kanban Board** - Visual task management (To Do, In Progress, Done)
- **Real-time Updates** - Move tasks between columns instantly
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, NextAuth v5
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Authentication:** NextAuth with JWT strategy

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/Chanda12-svg/nova-project-management.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev


