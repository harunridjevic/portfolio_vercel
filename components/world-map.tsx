"use client"

import { useState, useEffect } from "react"
import { useProjectContext } from "./project-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"
import { useTranslation } from "@/components/language-context"

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

export default function WorldMap() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const { setSelectedProject } = useProjectContext()
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === "dark"

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real implementation, you would fetch from GitHub API
        // For this example, we'll use mock data
        const mockProjects: Project[] = [
          {
            id: 1,
            name: "E-commerce Platform",
            description: "A full-stack e-commerce platform built with Next.js and Stripe",
            html_url: "https://github.com/username/ecommerce",
            homepage: "https://ecommerce-demo.com",
            language: "TypeScript",
            stargazers_count: 45,
            location: {
              lat: 40.7128,
              lng: -74.006,
              city: "New York",
              country: "USA",
            },
          },
          {
            id: 2,
            name: "Weather App",
            description: "Real-time weather application with global forecasts",
            html_url: "https://github.com/username/weather-app",
            homepage: "https://weather-app-demo.com",
            language: "JavaScript",
            stargazers_count: 32,
            location: {
              lat: 51.5074,
              lng: -0.1278,
              city: "London",
              country: "UK",
            },
          },
          {
            id: 3,
            name: "Travel Blog",
            description: "A travel blog built with Next.js and MDX",
            html_url: "https://github.com/username/travel-blog",
            homepage: "https://travel-blog-demo.com",
            language: "TypeScript",
            stargazers_count: 28,
            location: {
              lat: 35.6762,
              lng: 139.6503,
              city: "Tokyo",
              country: "Japan",
            },
          },
          {
            id: 4,
            name: "Recipe Finder",
            description: "Find and save recipes from around the world",
            html_url: "https://github.com/username/recipe-finder",
            homepage: "https://recipe-finder-demo.com",
            language: "JavaScript",
            stargazers_count: 19,
            location: {
              lat: 48.8566,
              lng: 2.3522,
              city: "Paris",
              country: "France",
            },
          },
          {
            id: 5,
            name: "Fitness Tracker",
            description: "Track your workouts and fitness progress",
            html_url: "https://github.com/username/fitness-tracker",
            homepage: "https://fitness-tracker-demo.com",
            language: "TypeScript",
            stargazers_count: 37,
            location: {
              lat: -33.8688,
              lng: 151.2093,
              city: "Sydney",
              country: "Australia",
            },
          },
        ]

        setProjects(mockProjects)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleMarkerClick = (project: Project) => {
    setSelectedProject(project)
  }

  if (isLoading) {
    return <Skeleton className="w-full h-[500px] rounded-lg" />
  }

  // Map coordinates to pixel positions
  const getPixelPosition = (lat: number, lng: number) => {
    // Convert lat/lng to x/y coordinates on the map
    // This is a simplified mercator projection
    const x = ((lng + 180) / 360) * 100
    const y = ((90 - lat) / 180) * 100
    return { x, y }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border shadow-sm">
      <div className={`relative aspect-[2/1] ${isDark ? "bg-gray-800" : "bg-blue-50"}`}>
        {/* Detailed SVG World Map */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Map background */}
          <rect x="0" y="0" width="1000" height="500" fill={isDark ? "#1f2937" : "#e6f2ff"} />

          {/* Grid lines */}
          <g stroke={isDark ? "#374151" : "#dbeafe"} strokeWidth="0.5">
            {/* Latitude lines */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`lat-${i}`} x1="0" y1={(i + 1) * 50} x2="1000" y2={(i + 1) * 50} />
            ))}
            {/* Longitude lines */}
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`lng-${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="500" />
            ))}
          </g>

          {/* Continents with detailed outlines */}
          <g fill={isDark ? "#374151" : "#dbeafe"} stroke={isDark ? "#4b5563" : "#93c5fd"} strokeWidth="1">
            {/* North America */}
            <path d="M150,120 C160,100 180,90 200,80 C220,70 240,60 260,70 C280,80 300,90 310,110 C320,130 330,150 320,170 C310,190 300,210 280,220 C260,230 240,240 220,230 C200,220 180,210 170,190 C160,170 150,150 150,120 Z" />

            {/* South America */}
            <path d="M250,250 C260,240 270,230 280,240 C290,250 300,260 300,280 C300,300 290,320 280,330 C270,340 260,350 250,340 C240,330 230,320 230,300 C230,280 240,260 250,250 Z" />

            {/* Europe */}
            <path d="M480,120 C490,110 500,100 510,110 C520,120 530,130 530,150 C530,170 520,180 510,190 C500,200 490,210 480,200 C470,190 460,180 460,160 C460,140 470,130 480,120 Z" />

            {/* Africa */}
            <path d="M480,220 C490,210 500,200 510,210 C520,220 530,230 530,250 C530,270 520,290 510,300 C500,310 490,320 480,310 C470,300 460,290 460,270 C460,250 470,230 480,220 Z" />

            {/* Asia */}
            <path d="M580,120 C600,100 620,90 640,100 C660,110 680,120 690,140 C700,160 710,180 700,200 C690,220 680,240 660,250 C640,260 620,270 600,260 C580,250 560,240 550,220 C540,200 530,180 540,160 C550,140 560,130 580,120 Z" />

            {/* Australia */}
            <path d="M750,300 C760,290 770,280 780,290 C790,300 800,310 800,330 C800,350 790,360 780,370 C770,380 760,390 750,380 C740,370 730,360 730,340 C730,320 740,310 750,300 Z" />

            {/* Antarctica (simplified) */}
            <path d="M200,450 C300,430 400,420 500,430 C600,440 700,450 800,440 C850,430 900,420 950,430 C980,440 990,450 980,460 C950,470 900,480 850,490 C800,495 750,498 700,499 C650,500 600,500 550,499 C500,498 450,496 400,494 C350,492 300,490 250,480 C200,470 150,460 120,450 C100,440 100,430 120,420 C140,410 160,420 200,450 Z" />

            {/* Greenland */}
            <path d="M350,80 C360,70 370,60 380,70 C390,80 400,90 400,100 C400,110 390,120 380,130 C370,140 360,150 350,140 C340,130 330,120 330,110 C330,100 340,90 350,80 Z" />

            {/* Indonesia (simplified) */}
            <path d="M720,270 C730,260 740,250 750,260 C760,270 770,280 770,290 C770,300 760,310 750,320 C740,330 730,340 720,330 C710,320 700,310 700,300 C700,290 710,280 720,270 Z" />

            {/* Japan (simplified) */}
            <path d="M780,180 C785,175 790,170 795,175 C800,180 805,185 805,190 C805,195 800,200 795,205 C790,210 785,215 780,210 C775,205 770,200 770,195 C770,190 775,185 780,180 Z" />

            {/* UK (simplified) */}
            <path d="M450,130 C452,128 454,126 456,128 C458,130 460,132 460,134 C460,136 458,138 456,140 C454,142 452,144 450,142 C448,140 446,138 446,136 C446,134 448,132 450,130 Z" />

            {/* Madagascar */}
            <path d="M550,300 C552,298 554,296 556,298 C558,300 560,302 560,304 C560,306 558,308 556,310 C554,312 552,314 550,312 C548,310 546,308 546,306 C546,304 548,302 550,300 Z" />

            {/* New Zealand (simplified) */}
            <path d="M850,350 C852,348 854,346 856,348 C858,350 860,352 860,354 C860,356 858,358 856,360 C854,362 852,364 850,362 C848,360 846,358 846,356 C846,354 848,352 850,350 Z" />
          </g>
        </svg>

        {/* Project markers */}
        {projects.map((project) => {
          const { x, y } = getPixelPosition(project.location.lat, project.location.lng)
          return (
            <button
              key={project.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => handleMarkerClick(project)}
              aria-label={`View project: ${project.name}`}
            >
              {/* Pulse animation */}
              <span className="absolute w-4 h-4 bg-red-500 rounded-full opacity-75 animate-ping"></span>

              {/* Marker */}
              <span className="relative flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none mb-2">
                <div
                  className={`px-3 py-1 rounded text-white text-sm whitespace-nowrap ${
                    isDark ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  {project.name}
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div
        className={`absolute bottom-4 left-4 ${
          isDark ? "bg-gray-800/80" : "bg-white/80"
        } backdrop-blur-sm p-3 rounded-lg shadow-sm`}
      >
        <div className="text-sm font-medium mb-2">{t("projectLocations")}</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-muted-foreground">{t("githubProjects")}</span>
        </div>
      </div>
    </div>
  )
}
