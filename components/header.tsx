"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Moon, Sun, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useTranslation } from "./language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()

  // Mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90" : "bg-transparent dark:bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span className="text-primary">Portfolio</span>
        </Link>

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

          {/* Simple theme toggle */}
          {mounted && (
            <Button variant="outline" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Language toggle */}
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {/* Theme toggle for mobile */}
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Language toggle for mobile */}
          <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "en" ? "bs" : "en")}>
            <Globe className="h-5 w-5" />
            <span className="sr-only">Change language</span>
          </Button>

          {/* Menu toggle */}
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            <Link href="/#projects" className="text-lg font-medium" onClick={closeMenu}>
              {t("projects")}
            </Link>
            <Link href="/#about" className="text-lg font-medium" onClick={closeMenu}>
              {t("about")}
            </Link>
            <Link href="/#contact" className="text-lg font-medium" onClick={closeMenu}>
              {t("contact")}
            </Link>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
