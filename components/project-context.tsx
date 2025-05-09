"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Project = {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  location: {
    lat: number
    lng: number
    city: string
    country: string
  }
}

type ProjectContextType = {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>{children}</ProjectContext.Provider>
}

export function useProjectContext() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ProjectProvider")
  }
  return context
}
