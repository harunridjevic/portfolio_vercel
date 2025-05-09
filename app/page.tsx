"use client"

import SuperDetailedWorldMap from "@/components/super-detailed-world-map"
import Hero from "@/components/hero"
import About from "@/components/about"
import Contact from "@/components/contact"
import ProjectModal from "@/components/project-modal"
import { useTranslation } from "@/components/language-context"
import { useTheme } from "next-themes"

export default function Home() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-[#FCFCFC]"}>
      <Hero />
      <section id="projects" className="container py-24 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{t("myProjects")}</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">{t("exploreGithub")}</p>
        <SuperDetailedWorldMap />
      </section>
      <About />
      <Contact />
      <ProjectModal />
    </main>
  )
}
