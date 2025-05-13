"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"

export default function About() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <section id="about" className={`py-24 ${isDark ? "bg-gray-800" : "bg-[#F8F9FA]"}`}>
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Illustration Box */}
          <div className="relative">
            <div
              className={`aspect-square max-w-md mx-auto rounded-2xl shadow-lg p-6 border ${
                isDark ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <div
                  className={`absolute inset-0 flex items-center justify-center text-primary font-medium ${
                    isDark
                      ? "bg-gradient-to-br from-primary/20 to-primary/40"
                      : "bg-gradient-to-br from-primary/10 to-primary/30"
                  }`}
                >
                  Your Photo Here
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-full" />
          </div>

          {/* Text Content */}
          <div className="mr-0 md:mr-10">
            <h2 className="text-3xl font-bold mb-6">{t("aboutMe")}</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("aboutText1")}</p>
              <p>{t("aboutText2")}</p>
              <p>{t("aboutText3")}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">{t("skills")}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>JavaScript / TypeScript</li>
                  <li>React / Next.js</li>
                  <li>Node.js</li>
                  <li>UI/UX Design</li>
                  <li>React Native</li>
                  <li>Git and Docker</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">{t("interests")}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Open Source</li>
                  <li>Web Accessibility</li>
                  <li>Performance Optimization</li>
                  <li>Actually useful sites</li>
                  <li>Unique sites</li>
                  <li>SEO</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
