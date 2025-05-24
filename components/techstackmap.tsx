"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "./language-context" // assuming same path as About

const techStack = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg" },
]

export default function TechStackSection() {
  const { resolvedTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <section
      id="tech-stack"
      className={`py-24 px-6 sm:px-10 transition-colors duration-500 ${
        isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("techStackTitle")}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className={`flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-md border ${
                isDark
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-white/80 border-gray-200 text-gray-800"
              } hover:scale-105 hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-10 h-10 mb-3"
                style={{ filter: isDark ? "invert(1)" : "none" }}
              />
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
