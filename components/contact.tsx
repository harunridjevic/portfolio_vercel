"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"

export default function Contact() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulated delay for submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <section id="contact" className={`py-24 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("getInTouchHeading")}</h2>
          <p className="text-muted-foreground">{t("contactSubheading")}</p>
        </div>

        <div className="max-w-md mx-auto">
          <div
            className={`rounded-xl shadow-sm border p-6 ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white"
            }`}
          >
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
