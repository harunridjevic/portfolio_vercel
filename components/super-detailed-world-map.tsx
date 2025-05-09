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

export default function SuperDetailedWorldMap() {
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
      <div className={`relative aspect-[2/1] ${isDark ? "bg-gray-900" : "bg-blue-50"}`}>
        {/* Super Detailed SVG World Map */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Map background */}
          <rect x="0" y="0" width="1000" height="500" fill={isDark ? "#111827" : "#e6f2ff"} />

          {/* Grid lines */}
          <g stroke={isDark ? "#1f2937" : "#dbeafe"} strokeWidth="0.5">
            {/* Latitude lines */}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`lat-${i}`} x1="0" y1={(i + 1) * 25} x2="1000" y2={(i + 1) * 25} />
            ))}
            {/* Longitude lines */}
            {Array.from({ length: 36 }).map((_, i) => (
              <line key={`lng-${i}`} x1={(i + 1) * 25} y1="0" x2={(i + 1) * 25} y2="500" />
            ))}
          </g>

          {/* Super detailed world map */}
          <g fill={isDark ? "#1f2937" : "#dbeafe"} stroke={isDark ? "#374151" : "#93c5fd"} strokeWidth="0.8">
            {/* North America */}
            <path d="M150,70 C155,65 160,60 165,55 C170,50 175,45 180,50 C185,55 190,60 195,65 C200,70 205,75 210,80 C215,85 220,90 225,95 C230,100 235,105 240,110 C245,115 250,120 245,125 C240,130 235,135 230,140 C225,145 220,150 215,155 C210,160 205,165 200,170 C195,175 190,180 185,175 C180,170 175,165 170,160 C165,155 160,150 155,145 C150,140 145,135 140,130 C135,125 130,120 125,115 C120,110 115,105 110,100 C105,95 100,90 105,85 C110,80 115,75 120,70 C125,65 130,60 135,65 C140,70 145,75 150,70 Z" />
            <path d="M110,100 C115,95 120,90 125,85 C130,80 135,75 140,80 C145,85 150,90 155,95 C160,100 165,105 170,110 C175,115 180,120 175,125 C170,130 165,135 160,140 C155,145 150,150 145,145 C140,140 135,135 130,130 C125,125 120,120 115,115 C110,110 105,105 110,100 Z" />
            <path d="M170,110 C175,105 180,100 185,95 C190,90 195,85 200,90 C205,95 210,100 215,105 C220,110 225,115 220,120 C215,125 210,130 205,135 C200,140 195,145 190,140 C185,135 180,130 175,125 C170,120 165,115 170,110 Z" />
            <path d="M220,120 C225,115 230,110 235,105 C240,100 245,95 250,100 C255,105 260,110 265,115 C270,120 275,125 270,130 C265,135 260,140 255,145 C250,150 245,155 240,150 C235,145 230,140 225,135 C220,130 215,125 220,120 Z" />

            {/* Central America */}
            <path d="M200,170 C205,165 210,160 215,155 C220,150 225,145 230,150 C235,155 240,160 245,165 C250,170 255,175 250,180 C245,185 240,190 235,195 C230,200 225,205 220,200 C215,195 210,190 205,185 C200,180 195,175 200,170 Z" />
            <path d="M235,195 C240,190 245,185 250,180 C255,175 260,170 265,175 C270,180 275,185 280,190 C285,195 290,200 285,205 C280,210 275,215 270,220 C265,225 260,230 255,225 C250,220 245,215 240,210 C235,205 230,200 235,195 Z" />

            {/* South America */}
            <path d="M270,220 C275,215 280,210 285,205 C290,200 295,195 300,200 C305,205 310,210 315,215 C320,220 325,225 330,230 C335,235 340,240 345,245 C350,250 355,255 350,260 C345,265 340,270 335,275 C330,280 325,285 320,290 C315,295 310,300 305,305 C300,310 295,315 290,320 C285,325 280,330 275,335 C270,340 265,345 260,350 C255,355 250,360 245,355 C240,350 235,345 230,340 C225,335 220,330 225,325 C230,320 235,315 240,310 C245,305 250,300 255,295 C260,290 265,285 270,280 C275,275 280,270 285,265 C290,260 295,255 290,250 C285,245 280,240 275,235 C270,230 265,225 270,220 Z" />

            {/* Europe */}
            <path d="M460,100 C465,95 470,90 475,85 C480,80 485,75 490,80 C495,85 500,90 505,95 C510,100 515,105 520,110 C525,115 530,120 525,125 C520,130 515,135 510,140 C505,145 500,150 495,155 C490,160 485,165 480,160 C475,155 470,150 465,145 C460,140 455,135 450,130 C445,125 440,120 445,115 C450,110 455,105 460,100 Z" />
            <path d="M450,130 C455,125 460,120 465,115 C470,110 475,105 480,110 C485,115 490,120 495,125 C500,130 505,135 500,140 C495,145 490,150 485,155 C480,160 475,165 470,160 C465,155 460,150 455,145 C450,140 445,135 450,130 Z" />
            <path d="M495,125 C500,120 505,115 510,110 C515,105 520,100 525,105 C530,110 535,115 540,120 C545,125 550,130 545,135 C540,140 535,145 530,150 C525,155 520,160 515,155 C510,150 505,145 500,140 C495,135 490,130 495,125 Z" />

            {/* Africa */}
            <path d="M460,180 C465,175 470,170 475,165 C480,160 485,155 490,160 C495,165 500,170 505,175 C510,180 515,185 520,190 C525,195 530,200 535,205 C540,210 545,215 550,220 C555,225 560,230 565,235 C570,240 575,245 580,250 C585,255 590,260 595,265 C600,270 605,275 610,280 C615,285 620,290 615,295 C610,300 605,305 600,310 C595,315 590,320 585,325 C580,330 575,335 570,340 C565,345 560,350 555,345 C550,340 545,335 540,330 C535,325 530,320 525,315 C520,310 515,305 510,300 C505,295 500,290 495,285 C490,280 485,275 480,270 C475,265 470,260 465,255 C460,250 455,245 450,240 C445,235 440,230 435,225 C430,220 425,215 420,210 C415,205 410,200 415,195 C420,190 425,185 430,180 C435,175 440,170 445,175 C450,180 455,185 460,180 Z" />

            {/* Asia */}
            <path d="M545,135 C550,130 555,125 560,120 C565,115 570,110 575,105 C580,100 585,95 590,90 C595,85 600,80 605,75 C610,70 615,65 620,70 C625,75 630,80 635,85 C640,90 645,95 650,100 C655,105 660,110 665,115 C670,120 675,125 680,130 C685,135 690,140 695,145 C700,150 705,155 710,160 C715,165 720,170 725,175 C730,180 735,185 740,190 C745,195 750,200 755,205 C760,210 765,215 770,220 C775,225 780,230 775,235 C770,240 765,245 760,250 C755,255 750,260 745,265 C740,270 735,275 730,280 C725,285 720,290 715,295 C710,300 705,305 700,310 C695,315 690,320 685,325 C680,330 675,335 670,340 C665,345 660,350 655,345 C650,340 645,335 640,330 C635,325 630,320 625,315 C620,310 615,305 610,300 C605,295 600,290 595,285 C590,280 585,275 580,270 C575,265 570,260 565,255 C560,250 555,245 550,240 C545,235 540,230 535,225 C530,220 525,215 520,210 C515,205 510,200 505,195 C500,190 495,185 490,180 C485,175 480,170 475,165 C470,160 465,155 460,150 C455,145 450,140 455,135 C460,130 465,125 470,120 C475,115 480,110 485,115 C490,120 495,125 500,130 C505,135 510,140 515,135 C520,130 525,125 530,130 C535,135 540,140 545,135 Z" />

            {/* Australia */}
            <path d="M780,280 C785,275 790,270 795,265 C800,260 805,255 810,250 C815,245 820,240 825,245 C830,250 835,255 840,260 C845,265 850,270 855,275 C860,280 865,285 870,290 C875,295 880,300 885,305 C890,310 895,315 890,320 C885,325 880,330 875,335 C870,340 865,345 860,350 C855,355 850,360 845,365 C840,370 835,375 830,370 C825,365 820,360 815,355 C810,350 805,345 800,340 C795,335 790,330 785,325 C780,320 775,315 770,310 C765,305 760,300 765,295 C770,290 775,285 780,280 Z" />

            {/* Indonesia */}
            <path d="M730,280 C735,275 740,270 745,265 C750,260 755,255 760,260 C765,265 770,270 775,275 C780,280 785,285 780,290 C775,295 770,300 765,305 C760,310 755,315 750,310 C745,305 740,300 735,295 C730,290 725,285 730,280 Z" />
            <path d="M760,260 C765,255 770,250 775,245 C780,240 785,235 790,240 C795,245 800,250 805,255 C810,260 815,265 810,270 C805,275 800,280 795,285 C790,290 785,295 780,290 C775,285 770,280 765,275 C760,270 755,265 760,260 Z" />
            <path d="M790,240 C795,235 800,230 805,225 C810,220 815,215 820,220 C825,225 830,230 835,235 C840,240 845,245 840,250 C835,255 830,260 825,265 C820,270 815,275 810,270 C805,265 800,260 795,255 C790,250 785,245 790,240 Z" />

            {/* Japan */}
            <path d="M800,160 C805,155 810,150 815,145 C820,140 825,135 830,140 C835,145 840,150 845,155 C850,160 855,165 850,170 C845,175 840,180 835,185 C830,190 825,195 820,190 C815,185 810,180 805,175 C800,170 795,165 800,160 Z" />
            <path d="M820,190 C825,185 830,180 835,175 C840,170 845,165 850,170 C855,175 860,180 865,185 C870,190 875,195 870,200 C865,205 860,210 855,215 C850,220 845,225 840,220 C835,215 830,210 825,205 C820,200 815,195 820,190 Z" />

            {/* UK */}
            <path d="M440,120 C442,118 444,116 446,114 C448,112 450,110 452,112 C454,114 456,116 458,118 C460,120 462,122 460,124 C458,126 456,128 454,130 C452,132 450,134 448,132 C446,130 444,128 442,126 C440,124 438,122 440,120 Z" />
            <path d="M452,112 C454,110 456,108 458,106 C460,104 462,102 464,104 C466,106 468,108 470,110 C472,112 474,114 472,116 C470,118 468,120 466,122 C464,124 462,126 460,124 C458,122 456,120 454,118 C452,116 450,114 452,112 Z" />

            {/* Madagascar */}
            <path d="M570,300 C572,298 574,296 576,294 C578,292 580,290 582,292 C584,294 586,296 588,298 C590,300 592,302 590,304 C588,306 586,308 584,310 C582,312 580,314 578,312 C576,310 574,308 572,306 C570,304 568,302 570,300 Z" />

            {/* New Zealand */}
            <path d="M880,350 C882,348 884,346 886,344 C888,342 890,340 892,342 C894,344 896,346 898,348 C900,350 902,352 900,354 C898,356 896,358 894,360 C892,362 890,364 888,362 C886,360 884,358 882,356 C880,354 878,352 880,350 Z" />
            <path d="M870,360 C872,358 874,356 876,354 C878,352 880,350 882,352 C884,354 886,356 888,358 C890,360 892,362 890,364 C888,366 886,368 884,370 C882,372 880,374 878,372 C876,370 874,368 872,366 C870,364 868,362 870,360 Z" />

            {/* Greenland */}
            <path d="M400,60 C405,55 410,50 415,45 C420,40 425,35 430,40 C435,45 440,50 445,55 C450,60 455,65 450,70 C445,75 440,80 435,85 C430,90 425,95 420,90 C415,85 410,80 405,75 C400,70 395,65 400,60 Z" />

            {/* Antarctica */}
            <path d="M200,450 C250,440 300,430 350,425 C400,420 450,415 500,420 C550,425 600,430 650,435 C700,440 750,445 800,450 C850,455 900,460 950,455 C975,452 990,450 980,445 C970,440 950,435 925,430 C900,425 875,420 850,415 C825,410 800,405 775,400 C750,395 725,390 700,385 C675,380 650,375 625,370 C600,365 575,360 550,355 C525,350 500,345 475,340 C450,335 425,330 400,335 C375,340 350,345 325,350 C300,355 275,360 250,365 C225,370 200,375 175,380 C150,385 125,390 100,395 C75,400 50,405 75,410 C100,415 125,420 150,425 C175,430 200,435 200,450 Z" />
          </g>

          {/* Country borders - simplified for major countries */}
          <g stroke={isDark ? "#4b5563" : "#60a5fa"} strokeWidth="0.3" fill="none">
            {/* USA state borders */}
            <path d="M150,100 L200,100 M175,80 L175,120 M150,120 L200,120" />

            {/* European country borders */}
            <path d="M460,120 L480,120 M470,110 L470,130 M460,140 L480,140" />
            <path d="M480,120 L500,120 M490,110 L490,130 M480,140 L500,140" />
            <path d="M500,120 L520,120 M510,110 L510,130 M500,140 L520,140" />

            {/* Asian country borders */}
            <path d="M600,120 L650,120 M625,100 L625,140 M600,140 L650,140" />
            <path d="M650,120 L700,120 M675,100 L675,140 M650,140 L700,140" />
            <path d="M700,120 L750,120 M725,100 L725,140 M700,140 L750,140" />

            {/* African country borders */}
            <path d="M480,200 L520,200 M500,180 L500,220 M480,220 L520,220" />
            <path d="M520,200 L560,200 M540,180 L540,220 M520,220 L560,220" />
            <path d="M480,220 L520,260 M500,240 L520,240 M480,260 L520,260" />

            {/* South American country borders */}
            <path d="M270,250 L300,250 M285,230 L285,270 M270,270 L300,270" />
            <path d="M270,270 L300,300 M285,285 L300,285 M270,300 L300,300" />
          </g>

          {/* Major rivers */}
          <g stroke={isDark ? "#1e40af" : "#3b82f6"} strokeWidth="0.5" fill="none">
            <path d="M180,100 C185,110 190,120 195,130 C200,140 205,150 210,160" />
            <path d="M500,120 C505,130 510,140 515,150 C520,160 525,170 530,180" />
            <path d="M650,150 C655,160 660,170 665,180 C670,190 675,200 680,210" />
            <path d="M280,250 C285,260 290,270 295,280 C300,290 305,300 310,310" />
          </g>

          {/* Major lakes */}
          <g fill={isDark ? "#1e40af" : "#3b82f6"}>
            <ellipse cx="190" cy="110" rx="5" ry="3" />
            <ellipse cx="510" cy="130" rx="4" ry="2" />
            <ellipse cx="660" cy="160" rx="6" ry="4" />
            <ellipse cx="290" cy="260" rx="3" ry="2" />
          </g>

          {/* Major cities */}
          <g fill={isDark ? "#f59e0b" : "#f59e0b"}>
            <circle cx="175" cy="105" r="1" />
            <circle cx="195" cy="125" r="1" />
            <circle cx="455" cy="125" r="1" />
            <circle cx="485" cy="115" r="1" />
            <circle cx="515" cy="125" r="1" />
            <circle cx="625" cy="125" r="1" />
            <circle cx="655" cy="145" r="1" />
            <circle cx="685" cy="165" r="1" />
            <circle cx="485" cy="205" r="1" />
            <circle cx="515" cy="225" r="1" />
            <circle cx="275" cy="255" r="1" />
            <circle cx="295" cy="275" r="1" />
            <circle cx="815" cy="295" r="1" />
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
