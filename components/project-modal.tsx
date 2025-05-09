"use client"

import { useEffect, useState } from "react"
import { useProjectContext } from "./project-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function ProjectModal() {
  const { selectedProject, setSelectedProject } = useProjectContext()
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsOpen(!!selectedProject)
  }, [selectedProject])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Wait for animation to complete
  }

  if (!selectedProject) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`sm:max-w-[600px] ${isDark ? "bg-gray-800 border-gray-700" : ""}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{selectedProject.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3" />
            {selectedProject.location.city}, {selectedProject.location.country}
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4">
          <Image
            src={`/placeholder.svg?height=300&width=600&text=${selectedProject.name}`}
            alt={selectedProject.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">{selectedProject.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              {selectedProject.language}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {selectedProject.stargazers_count}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="sm">
              <a
                href={selectedProject.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            {selectedProject.homepage && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={selectedProject.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
