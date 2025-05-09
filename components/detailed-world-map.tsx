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

export default function DetailedWorldMap() {
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
            {/* North America - More detailed outline */}
            <path d="M170,80 C175,75 180,70 190,65 C200,60 210,55 220,60 C230,65 240,70 245,80 C250,90 255,100 250,110 C245,120 240,130 230,135 C220,140 210,145 200,140 C190,135 180,130 175,120 C170,110 165,100 170,80 Z" />
            <path d="M130,120 C140,110 150,100 160,105 C170,110 180,115 185,125 C190,135 195,145 190,155 C185,165 180,175 170,180 C160,185 150,190 140,185 C130,180 120,175 115,165 C110,155 105,145 110,135 C115,125 120,130 130,120 Z" />
            <path d="M190,140 C200,130 210,120 220,125 C230,130 240,135 245,145 C250,155 255,165 250,175 C245,185 240,195 230,200 C220,205 210,210 200,205 C190,200 180,195 175,185 C170,175 165,165 170,155 C175,145 180,150 190,140 Z" />

            {/* Central America - Connecting North and South America */}
            <path d="M220,200 C225,195 230,190 235,195 C240,200 245,205 250,210 C255,215 260,220 255,225 C250,230 245,235 240,240 C235,245 230,250 225,245 C220,240 215,235 210,230 C205,225 200,220 205,215 C210,210 215,205 220,200 Z" />

            {/* South America - More detailed outline */}
            <path d="M250,250 C260,240 270,230 280,235 C290,240 300,245 305,255 C310,265 315,275 310,285 C305,295 300,305 290,310 C280,315 270,320 260,315 C250,310 240,305 235,295 C230,285 225,275 230,265 C235,255 240,260 250,250 Z" />
            <path d="M270,310 C275,305 280,300 285,305 C290,310 295,315 300,320 C305,325 310,330 305,335 C300,340 295,345 290,350 C285,355 280,360 275,355 C270,350 265,345 260,340 C255,335 250,330 255,325 C260,320 265,315 270,310 Z" />

            {/* Europe - More detailed outline */}
            <path d="M480,100 C485,95 490,90 495,95 C500,100 505,105 510,110 C515,115 520,120 515,125 C510,130 505,135 500,140 C495,145 490,150 485,145 C480,140 475,135 470,130 C465,125 460,120 465,115 C470,110 475,105 480,100 Z" />
            <path d="M460,120 C465,115 470,110 475,115 C480,120 485,125 490,130 C495,135 500,140 495,145 C490,150 485,155 480,160 C475,165 470,170 465,165 C460,160 455,155 450,150 C445,145 440,140 445,135 C450,130 455,125 460,120 Z" />

            {/* Africa - More detailed outline */}
            <path d="M480,200 C490,190 500,180 510,185 C520,190 530,195 535,205 C540,215 545,225 540,235 C535,245 530,255 520,260 C510,265 500,270 490,265 C480,260 470,255 465,245 C460,235 455,225 460,215 C465,205 470,210 480,200 Z" />
            <path d="M510,260 C515,255 520,250 525,255 C530,260 535,265 540,270 C545,275 550,280 545,285 C540,290 535,295 530,300 C525,305 520,310 515,305 C510,300 505,295 500,290 C495,285 490,280 495,275 C500,270 505,265 510,260 Z" />

            {/* Asia - More detailed outline */}
            <path d="M580,100 C590,90 600,80 610,85 C620,90 630,95 635,105 C640,115 645,125 640,135 C635,145 630,155 620,160 C610,165 600,170 590,165 C580,160 570,155 565,145 C560,135 555,125 560,115 C565,105 570,110 580,100 Z" />
            <path d="M620,160 C625,155 630,150 635,155 C640,160 645,165 650,170 C655,175 660,180 655,185 C650,190 645,195 640,200 C635,205 630,210 625,205 C620,200 615,195 610,190 C605,185 600,180 605,175 C610,170 615,165 620,160 Z" />
            <path d="M650,170 C655,165 660,160 665,165 C670,170 675,175 680,180 C685,185 690,190 685,195 C680,200 675,205 670,210 C665,215 660,220 655,215 C650,210 645,205 640,200 C635,195 630,190 635,185 C640,180 645,175 650,170 Z" />

            {/* Australia - More detailed outline */}
            <path d="M750,280 C760,270 770,260 780,265 C790,270 800,275 805,285 C810,295 815,305 810,315 C805,325 800,335 790,340 C780,345 770,350 760,345 C750,340 740,335 735,325 C730,315 725,305 730,295 C735,285 740,290 750,280 Z" />

            {/* Antarctica (simplified) */}
            <path d="M200,450 C300,430 400,420 500,430 C600,440 700,450 800,440 C850,430 900,420 950,430 C980,440 990,450 980,460 C950,470 900,480 850,490 C800,495 750,498 700,499 C650,500 600,500 550,499 C500,498 450,496 400,494 C350,492 300,490 250,480 C200,470 150,460 120,450 C100,440 100,430 120,420 C140,410 160,420 200,450 Z" />

            {/* Greenland */}
            <path d="M350,80 C360,70 370,60 380,65 C390,70 400,75 405,85 C410,95 415,105 410,115 C405,125 400,135 390,140 C380,145 370,150 360,145 C350,140 340,135 335,125 C330,115 325,105 330,95 C335,85 340,90 350,80 Z" />

            {/* Indonesia (simplified) */}
            <path d="M720,270 C725,265 730,260 735,265 C740,270 745,275 750,280 C755,285 760,290 755,295 C750,300 745,305 740,310 C735,315 730,320 725,315 C720,310 715,305 710,300 C705,295 700,290 705,285 C710,280 715,275 720,270 Z" />

            {/* Japan (simplified) */}
            <path d="M780,180 C785,175 790,170 795,175 C800,180 805,185 810,190 C815,195 820,200 815,205 C810,210 805,215 800,220 C795,225 790,230 785,225 C780,220 775,215 770,210 C765,205 760,200 765,195 C770,190 775,185 780,180 Z" />

            {/* UK (simplified) */}
            <path d="M450,130 C452,128 454,126 456,128 C458,130 460,132 462,134 C464,136 466,138 464,140 C462,142 460,144 458,146 C456,148 454,150 452,148 C450,146 448,144 446,142 C444,140 442,138 444,136 C446,134 448,132 450,130 Z" />

            {/* Madagascar */}
            <path d="M550,300 C552,298 554,296 556,298 C558,300 560,302 562,304 C564,306 566,308 564,310 C562,312 560,314 558,316 C556,318 554,320 552,318 C550,316 548,314 546,312 C544,310 542,308 544,306 C546,304 548,302 550,300 Z" />

            {/* New Zealand (simplified) */}
            <path d="M850,350 C852,348 854,346 856,348 C858,350 860,352 862,354 C864,356 866,358 864,360 C862,362 860,364 858,366 C856,368 854,370 852,368 C850,366 848,364 846,362 C844,360 842,358 844,356 C846,354 848,352 850,350 Z" />
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
