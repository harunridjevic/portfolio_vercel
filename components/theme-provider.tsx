"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Add this script to handle theme initialization
const themeScript = `
  (function() {
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme') || 'system';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme === 'system' ? systemTheme : savedTheme;
    
    // Apply the theme class immediately to prevent flash
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
`

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </>
  )
}
