"use client"

import { useTranslation } from "./language-context"
import { useTheme } from "next-themes"

export default function About() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section id="about" className={isDark ? "py-24 bg-gray-800" : "py-24 bg-[#F8F9FA]"}>
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className={`aspect-square max-w-md mx-auto ${isDark ? "bg-gray-700" : "bg-white"} rounded-2xl shadow-lg p-6 border ${isDark ? "border-gray-600" : ""}`}
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                {/* Replace with your actual image */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${isDark ? "bg-gradient-to-br from-primary/20 to-primary/40" : "bg-gradient-to-br from-primary/10 to-primary/30"} text-primary font-medium`}
                >
                  Your Photo Here
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-primary/20 rounded-full"></div>
          </div>

          <div>
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
                  <li>Responsive Web Design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">{t("interests")}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Open Source</li>
                  <li>Web Accessibility</li>
                  <li>Performance Optimization</li>
                  <li>Interactive Maps</li>
                  <li>Data Visualization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
