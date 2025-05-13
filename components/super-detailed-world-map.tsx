"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"
import { useTranslation } from "@/components/language-context"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

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
  screenshot?: string
}

export default function SuperDetailedWorldMap() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }) // Track mouse position
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === "dark"

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjects([
          {
            id: 1,
            name: "Portfolio Site",
            description: "A personal portfolio site that you're currently on.",
            html_url: "https://github.com/harunridjevic/Portfolio",
            homepage: "https://harunridjevic.com",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 20.8566, lng: 5.3522, city: "Sarajevo", country: "Bosnia" },
            screenshot: "/screenshots/portfolio.png",
          },
          {
            id: 2,
            name: "Towing Company site",
            description: "A site for a local towing firm.",
            html_url: "https://github.com/harunridjevic/SlepSluzbaSarajevo",
            homepage: "https://slepsluzbasarajevo.com",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 20.8566, lng: 1.3522, city: "Sarajevo", country: "Bosnia" },
            screenshot: "/screenshots/slepsluzbasarajevo.png",
          },
          {
            id: 3,
            name: "Marx brothers site",
            description: "A freelance project for a university student.",
            html_url: "https://github.com/harunridjevic/MarxBrothers",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 26.8566, lng: -66.3522, city: "New York", country: "USA" },
            screenshot: "/screenshots/marxbrothers.png",
          },
          {
            id: 4,
            name: "Vuk Army Shop",
            description: "A site for a local clothing shop.",
            html_url: "https://github.com/harunridjevic/VukArmyShop",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 25.8566, lng: 1.3522, city: "Kozarska Dubica", country: "Bosnia" },
            screenshot: "/screenshots/vukarmyshop.png",
          },
          {
            id: 5,
            name: "Passgen",
            description: "A simple python program for making passwords.",
            html_url: "https://github.com/harunridjevic/Passgen",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 35.8566, lng: 14.3522, city: "Minsk", country: "Belarus" },
            screenshot: "/screenshots/passgen.png",
          },
          {
            id: 6,
            name: "PaintFactory",
            description: "A vector drawing tool made in C++.",
            html_url: "https://github.com/harunridjevic/PaintFactory",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 15.8566, lng: 1.3522, city: "Sarajevo", country: "Bosnia" },
            screenshot: "/screenshots/paintfactory.png",
          },
          {
            id: 7,
            name: "Branchbuddy",
            description: "A duolingo-like self-help AI app with a cute mascot.",
            html_url: "https://github.com/harunridjevic/BranchBuddy",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 35.8566, lng: -10.3522, city: "London", country: "UK" },
            screenshot: "/screenshots/BranchBuddy.png",
          },
          {
            id: 8,
            name: "Kip.ba + KipMobile",
            description: "A webshop similar to eBay but for the local market + a mobile version.",
            html_url: "https://github.com/harunridjevic/Kip.ba",
            homepage: "",
            language: "TypeScript",
            stargazers_count: 0,
            location: { lat: 25.8566, lng: 5.3522, city: "Sarajevo", country: "Bosnia" },
            screenshot: "/screenshots/kipba.png",
          },
        ])
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const projectToSvgCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 1000
    const y = ((90 - lat) / 180) * 500
    return { x, y }
  }

  const handleScrollLock = (isOpen: boolean) => {
    if (isOpen) {
      // Lock body scroll and save the scroll position before modal opens
      document.body.style.overflow = "hidden"
      const scrollPosition = window.pageYOffset
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPosition}px` // Save the current scroll position
    } else {
      // Restore scroll and clean up after modal closes
      const scrollPosition = document.body.style.top
      document.body.style.overflow = "auto"
      document.body.style.position = ""
      document.body.style.top = ""
      
      // Use the saved scroll position to scroll back to the correct spot
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10) * -1)
      }
    }
  }

  useEffect(() => {
    handleScrollLock(!!selectedProject)
    return () => {
      handleScrollLock(false)
    }
  }, [selectedProject])

  if (isLoading) {
    return <Skeleton className="w-full h-[500px] rounded-lg" />
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border shadow-sm">
      <div className={`relative aspect-[2/1] ${isDark ? "bg-gray-900" : "bg-blue-50"}`}>
        {/* Background Map Image */}
        <img
          src="map.png"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* SVG Grid + Markers */}
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <g stroke={isDark ? "#1f2937" : "#dbeafe"} strokeWidth="0.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`lat-${i}`} x1="0" y1={(i + 1) * 25} x2="1000" y2={(i + 1) * 25} />
            ))}
            {Array.from({ length: 36 }).map((_, i) => (
              <line key={`lng-${i}`} x1={(i + 1) * 25} y1="0" x2={(i + 1) * 25} y2="500" />
            ))}
          </g>

          {/* Markers */}
          {projects.map((project) => {
            const { x, y } = projectToSvgCoords(project.location.lat, project.location.lng)
            return (
              <circle
                key={project.id}
                cx={x}
                cy={y}
                r="6"
                className="cursor-pointer"
                fill="red"
                stroke="white"
                strokeWidth="1.5"
                onClick={() => setSelectedProject(project)} // Click to select the project
                onMouseEnter={(e) => {
                  setHoveredProject(project)
                  const svg = e.currentTarget.ownerSVGElement!.getBoundingClientRect()
                  setMousePos({
                    x: e.clientX - svg.left,
                    y: e.clientY - svg.top,
                  })
                }}
                onMouseLeave={() => setHoveredProject(null)}
              />
            )
          })}
        </svg>
      </div>

      {/* Map Legend (Hidden on Mobile) */}
      <div
        className={`absolute bottom-4 left-4 z-20 ${
          isDark ? "bg-gray-800/80" : "bg-white/80"
        } backdrop-blur-sm p-3 rounded-lg shadow-sm hidden md:block`}
      >
        <div className="text-sm font-medium mb-2">{t("projectLocations")}</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-muted-foreground">{t("githubProjects")}</span>
        </div>
      </div>

      {/* Tooltip for hovered project */}
      {hoveredProject && (
        <div
          className={`absolute z-20 pointer-events-none text-xs px-2 py-1 rounded shadow-md ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 30}px`,
            transform: "translate(-50%, -100%)",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredProject.name}
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
  <Dialog open={true} onOpenChange={() => setSelectedProject(null)}>
    <DialogContent className="max-w-2xl w-full p-6 sm:p-8 rounded-xl">
      <DialogTitle className="text-2xl font-bold mb-2">
        {selectedProject.name}
      </DialogTitle>

      <p className="text-sm text-muted-foreground mb-4">
        {selectedProject.location.city}, {selectedProject.location.country}
      </p>

      {selectedProject.screenshot && (
        <img
          src={selectedProject.screenshot}
          alt={`Screenshot of ${selectedProject.name}`}
          className="w-full max-h-[300px] object-cover rounded-lg border mb-4"
        />
      )}

      <p className="text-base leading-relaxed mb-4">
        {selectedProject.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {selectedProject.homepage?.trim() && (
          <a
            href={selectedProject.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            🌐 Visit Project
          </a>
        )}
        <a
          href={selectedProject.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          🔗 View on GitHub
        </a>
      </div>
    </DialogContent>
  </Dialog>
)}



      {/* List of projects for mobile */}
      <div className="md:hidden mt-8">
        <h3 className="text-xl font-bold text-center mb-4">{t("Projects")}</h3>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id}>
              <div
                className={`block p-4 rounded-lg shadow-md ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"} 
                transition-transform transform active:scale-95`}  // Press animation effect
                onClick={() => setSelectedProject(project)} // Modal trigger on click
              >
                <div className="font-semibold">{project.name}</div>
                <div className="text-sm">{project.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
