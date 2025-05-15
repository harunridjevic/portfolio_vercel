"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const illustrations = heroRef.current.querySelectorAll(".floating-illustration")
      illustrations.forEach((el) => {
        const element = el as HTMLElement
        const speed = Number.parseFloat(element.dataset.speed || "1")
        const xOffset = x * 20 * speed
        const yOffset = y * 20 * speed
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const isDark = theme === "dark"

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-12 px-4 dark:bg-gray-900"
    >
      {/* Background illustrations */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="floating-illustration absolute top-[10%] left-[5%] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24" data-speed="2">
            <div className={`w-full h-full rounded-lg ${isDark ? "bg-gray-800" : "bg-blue-100"}`} />
          </div>
          <div className="floating-illustration absolute bottom-[15%] right-[10%] w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32" data-speed="1.5">
            <div className={`w-full h-full rounded-full ${isDark ? "bg-gray-700" : "bg-indigo-100"}`} />
          </div>
          <div className="floating-illustration absolute top-[35%] right-[5%] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" data-speed="2.5">
            <div className={`w-full h-full rounded-md transform rotate-45 ${isDark ? "bg-gray-800" : "bg-purple-100"}`} />
          </div>
          <div className="floating-illustration absolute bottom-[25%] left-[10%] w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" data-speed="1.8">
            <div className={`w-full h-full rounded-lg transform rotate-12 ${isDark ? "bg-gray-700" : "bg-pink-100"}`} />
          </div>
        </div>
      )}

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-primary">{t("hello")}</span>{" "}
            <span className="gradient-text">Harun Riđević</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 dark:text-gray-300 text-gray-700">
            {t("createMeaningful")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
            <Button size="lg" onClick={scrollToProjects} className="w-full sm:w-auto">
              {t("exploreProjects")}
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="#contact">{t("getInTouch")}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToProjects}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </div>
  )
}
