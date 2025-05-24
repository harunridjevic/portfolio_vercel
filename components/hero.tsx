"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"
import clsx from "clsx"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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
        const xOffset = x * 30 * speed
        const yOffset = y * 30 * speed
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

  const bgBase = isDark ? "bg-gray-800" : "bg-blue-100"

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-2 dark:bg-gray-900"
    >
      {/* Background floating elements */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[
            { top: "15%", left: "10%", size: "w-16 h-16 md:w-24 md:h-24", shape: "rounded-lg", speed: 2 },
            { bottom: "20%", right: "15%", size: "w-20 h-20 md:w-32 md:h-32", shape: "rounded-full", speed: 1.5 },
            { top: "40%", right: "10%", size: "w-12 h-12 md:w-16 md:h-16", shape: "rounded-md rotate-45", speed: 2.5 },
            { bottom: "30%", left: "20%", size: "w-14 h-14 md:w-20 md:h-20", shape: "rounded-lg rotate-12", speed: 1.8 }
          ].map((circle, i) => (
            <div
              key={i}
              className={clsx(
                "floating-illustration absolute animate-float transition-transform duration-300 ease-out",
                circle.size
              )}
              style={{ ...circle }}
              data-speed={circle.speed}
            >
              <div
                className={clsx("w-full h-full opacity-80 animate-fadeIn", circle.shape, bgBase)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Hero content */}
      <div className="container px-4 md:px-6 z-10 -translate-y-20 md:translate-y-0">
        <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">{t("hello")}</span>{" "}
            <span className="gradient-text">Harun Riđević</span>
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

      <div className="absolute bottom-24 md:bottom-16 left-1/2 transform -translate-x-1/2 -ml-4 animate-bounce -translate-y-14 md:translate-y-0">
        <Button variant="ghost" size="icon" onClick={scrollToProjects}>
          <ArrowDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </div>
  )
}
