"use client"

import { useEffect, useState, useRef } from "react"
import SuperDetailedWorldMap from "@/components/super-detailed-world-map"
import Hero from "@/components/hero"
import About from "@/components/about"
import Contact from "@/components/contact"
import ProjectModal from "@/components/project-modal"
import TechStack from "@/components/techstackmap"
import { useTranslation } from "@/components/language-context"
import { useTheme } from "next-themes"

export default function Home() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const projectsRef = useRef(null)

  // Mark mounted after hydration to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Intersection observer only runs after mount
  useEffect(() => {
    if (!mounted || !projectsRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(projectsRef.current)
    return () => observer.disconnect()
  }, [mounted])

  // Don’t render anything on server or before mounted to avoid mismatch
  if (!mounted) return null

  const isDark = theme === "dark"
  const opacityClass = visible ? "opacity-100" : "opacity-0"

  return (
    <main className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-[#FCFCFC]"}>
      <Hero />
      <section
          id="projects"
          ref={projectsRef}
          className={`w-full py-24 px-4 md:px-6 transition-opacity duration-1000 ease-in-out ${opacityClass} ${isDark ? "bg-gray-800" : "bg-[#F8F9FA]"}`}
        >

        <h2 className="text-3xl font-bold text-center mb-6">{t("myProjects")}</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">{t("exploreGithub")}</p>
        <SuperDetailedWorldMap />
      </section>
      <TechStack />
      <About />
      <Contact />
      <ProjectModal />
    </main>
  )
}
