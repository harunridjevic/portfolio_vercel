"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Moon, Sun, Globe, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useTranslation } from "./language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, useInView } from "framer-motion"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()

  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
  }, [menuOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="font-bold text-xl flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="text-primary">Harun Riđević</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#projects" className="text-sm font-medium hover:text-primary transition-colors">
            {t("projects")}
          </Link>
          <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
            {t("about")}
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
            {t("contact")}
          </Link>

          {mounted && (
            <Button variant="outline" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <span className={cn("mr-2", language === "en" && "font-bold")}>🇺🇸</span>
                <span>{t("english")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bs")}>
                <span className={cn("mr-2", language === "bs" && "font-bold")}>🇧🇦</span>
                <span>{t("bosnian")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://github.com/harunridjevic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </Button>
        </nav>

        {/* Mobile nav buttons + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "bs" : "en")}
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-12 p-10 text-2xl font-semibold z-50 relative"
        >
          <Link href="/#projects" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("projects")}
          </Link>
          <Link href="/#about" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("about")}
          </Link>
          <Link href="/#contact" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
            {t("contact")}
          </Link>

          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-12 w-12"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "bs" : "en")}
            className="h-12 w-12"
            aria-label="Change language"
          >
            <Globe className="h-6 w-6" />
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link
              href="https://github.com/harunridjevic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
              onClick={() => setMenuOpen(false)}
            >
              <Github className="h-6 w-6" />
              <span>GitHub</span>
            </Link>
          </Button>
        </div>
      )}
    </motion.header>
  )
}
