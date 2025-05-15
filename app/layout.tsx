import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProjectProvider } from "@/components/project-context"
import { LanguageProvider } from "@/components/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portfolio | Projects Around the World",
  description: "A showcase of my projects from around the world",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={``}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <ProjectProvider>
              {/* No need to wrap with another flex container here */}
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </ProjectProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
