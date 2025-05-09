"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isDark = theme === "dark"

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

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 dark:bg-gray-900"
    >
      {/* Background illustrations */}
      <div className="absolute inset-0 z-0">
        <div className="floating-illustration absolute top-[15%] left-[10%] w-16 h-16 md:w-24 md:h-24" data-speed="2">
          <div className={`w-full h-full rounded-lg ${isDark ? "bg-gray-800" : "bg-blue-100"}`}></div>
        </div>
        <div
          className="floating-illustration absolute bottom-[20%] right-[15%] w-20 h-20 md:w-32 md:h-32"
          data-speed="1.5"
        >
          <div className={`w-full h-full rounded-full ${isDark ? "bg-gray-700" : "bg-indigo-100"}`}></div>
        </div>
        <div
          className="floating-illustration absolute top-[40%] right-[10%] w-12 h-12 md:w-16 md:h-16"
          data-speed="2.5"
        >
          <div
            className={`w-full h-full rounded-md transform rotate-45 ${isDark ? "bg-gray-800" : "bg-purple-100"}`}
          ></div>
        </div>
        <div
          className="floating-illustration absolute bottom-[30%] left-[20%] w-14 h-14 md:w-20 md:h-20"
          data-speed="1.8"
        >
          <div
            className={`w-full h-full rounded-lg transform rotate-12 ${isDark ? "bg-gray-700" : "bg-pink-100"}`}
          ></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">{t("hello")}</span> <span className="gradient-text">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 dark:text-gray-300 text-gray-700">{t("createMeaningful")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToProjects}>
              {t("exploreProjects")}
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">{t("getInTouch")}</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToProjects}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </div>
  )
}
