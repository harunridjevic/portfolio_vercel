"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Footer() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until the component is mounted to avoid hydration error
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render the component until mounted (to prevent hydration mismatch)
  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <footer className={`border-t py-8 ${isDark ? "bg-gray-900 border-gray-800" : "bg-[#FCFCFC] border-gray-300"}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Harun Riđević. {t("allRightsReserved")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/harunridjevic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:harunridjevic@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
