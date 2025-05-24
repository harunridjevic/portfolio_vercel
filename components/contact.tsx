"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"
import { useInView } from "react-intersection-observer"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)

  // Intersection Observer
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  // Combine refs
  const setRefs = (node: HTMLDivElement) => {
    contactRef.current = node
    inViewRef(node)
  }

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contactRef.current) return
      const { clientX, clientY } = e
      const { width, height, left, top } = contactRef.current.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const illustrations = contactRef.current.querySelectorAll(".floating-illustration")
      illustrations.forEach((el) => {
        const element = el as HTMLElement
        const speed = parseFloat(element.dataset.speed || "1")
        const xOffset = x * 20 * speed
        const yOffset = y * 20 * speed
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formState,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      alert("Failed to send message. Please try again.")
      console.error("EmailJS Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null
  const isDark = resolvedTheme === "dark"

  return (
    <section
      id="contact"
      ref={setRefs}
      className={`relative py-24 overflow-hidden transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      } ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Floating illustrations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="floating-illustration absolute top-[20%] left-[10%] w-16 h-16 md:w-24 md:h-24"
          data-speed="1.5"
        >
          <div className={`w-full h-full rounded-full ${isDark ? "bg-gray-700" : "bg-blue-100"}`} />
        </div>
        <div
          className="floating-illustration absolute bottom-[10%] right-[15%] w-20 h-20 md:w-32 md:h-32"
          data-speed="2"
        >
          <div className={`w-full h-full rounded-lg ${isDark ? "bg-gray-800" : "bg-pink-100"}`} />
        </div>
        <div
          className="floating-illustration absolute top-[35%] right-[20%] w-12 h-12 md:w-16 md:h-16"
          data-speed="1.2"
        >
          <div className={`w-full h-full rounded-md rotate-12 ${isDark ? "bg-gray-700" : "bg-green-100"}`} />
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12 transition-all duration-700 delay-200">
          <h2 className={`text-3xl font-bold mb-4 ${inView ? "animate-fade-in" : "opacity-0"}`}>
            {t("getInTouchHeading")}
          </h2>
          <p className={`text-muted-foreground ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}>
            {t("contactSubheading")}
          </p>
        </div>

        <div className={`max-w-md mx-auto transition-transform duration-700 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className={`rounded-xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t("messageSent")}</h3>
                <p className="text-muted-foreground">{t("thankYou")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t("name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={t("yourName")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t("email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t("yourEmail")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t("message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t("yourMessage")}
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("sending") : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("sendMessage")}
                    </>
                  )}
                </Button>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>{t("orEmailMe")}</p>
                  <a
                    href="mailto:harunridjevic@gmail.com"
                    className="flex items-center justify-center gap-1 text-primary hover:underline mt-1"
                  >
                    <Mail className="h-3 w-3" />
                    harunridjevic@gmail.com
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
