"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "bs"

type Translations = {
  [key: string]: {
    en: string
    bs: string
  }
}

// Translations dictionary
const translations: Translations = {
  // Header
  projects: {
    en: "Projects",
    bs: "Projekti",
  },
  about: {
    en: "About",
    bs: "O meni",
  },
  contact: {
    en: "Contact",
    bs: "Kontakt",
  },
  // Hero
  hello: {
    en: "Hello, I'm",
    bs: "Zdravo, ja sam",
  },
  createMeaningful: {
    en: "I create full-stack solutions for people around the world",
    bs: "Stvaram full-stack rješenja za ljude širom svijeta",
  },
  exploreProjects: {
    en: "Explore My Projects",
    bs: "Istražite moje projekte",
  },
  getInTouch: {
    en: "Get in Touch",
    bs: "Kontaktirajte me",
  },
  // Projects
  myProjects: {
    en: "My Projects Around the World",
    bs: "Moji projekti širom svijeta",
  },
  exploreGithub: {
    en: "Explore my GitHub projects positioned on this interactive map based on where the client was from or where the audience is targeted.",
    bs: "Istražite moje GitHub projekte postavljene na ovoj interaktivnoj mapi prema lokaciji klijenta ili gdje je publika targetirana.",
  },
  projectLocations: {
    en: "Project Locations",
    bs: "Lokacije projekata",
  },
  githubProjects: {
    en: "GitHub Projects",
    bs: "GitHub projekti",
  },
  // About
  aboutMe: {
    en: "About Me",
    bs: "O meni",
  },
  aboutText1: {
    en: "Hi, I'm an 18-year-old developer who's been coding since I was 10. My journey started with a fun beginner project—a simple HTML-based operating system. Over the years, I've expanded my skills into web development, mobile development, mobile game development with Godot and GDScript, and Arduino programming. I’ve competed in various programming competitions, securing 2nd place in the Sarajevo Cantonal competition, which has given me a solid competitive edge. I'm a quick learner who thrives on getting things done and building meaningful full-stack solutions.",
    bs: "Zdravo, ja sam 18-godišnji developer koji kodira od svoje 10. godine. Moj put je počeo sa zabavnim početničkim projektom—jednostavnim operativnim sistemom zasnovanim na HTML-u. Tokom godina, proširio sam svoje vještine na web razvoj, mobilni razvoj, razvoj mobilnih igara sa Godotom i GDScriptom, kao i Arduino programiranje. Učestvovao sam u raznim programerskim takmičenjima, osvajajući 2. mjesto na Sarajevskom kantonalnom takmičenju, što mi je dalo solidnu konkurentsku prednost. Brzo učim i volim da dovodim stvari do kraja, stvarajući značajna full-stack rješenja.",
  },
  aboutText2: {
    en: "I specialize in building modern web applications using technologies like React, Next.js, and TypeScript. My goal is to create intuitive, accessible, and performant experiences that delight users.",
    bs: "Specijaliziran sam za izgradnju modernih web aplikacija koristeći tehnologije poput React-a, Next.js-a i TypeScript-a. Moj cilj je stvoriti intuitivna, pristupačna i efikasna iskustva koja oduševljavaju korisnike.",
  },
  aboutText3: {
    en: "When I'm not coding, you can find me reading, researching, or experimenting with new technologies.",
    bs: "Kada ne kodiram, možete me naći kako čitam, istražujem ili eksperimentiram s novim tehnologijama.",
  },
  skills: {
    en: "Skills",
    bs: "Vještine",
  },
  interests: {
    en: "Interests",
    bs: "Interesi",
  },
  // Contact
  getInTouchHeading: {
    en: "Get In Touch",
    bs: "Stupite u kontakt",
  },
  contactSubheading: {
    en: "Have a question or want to work together? Feel free to reach out!",
    bs: "Imate pitanje ili želite raditi sa mnom? Slobodno me kontaktirajte!",
  },
  name: {
    en: "Name",
    bs: "Ime",
  },
  email: {
    en: "Email",
    bs: "Email",
  },
  message: {
    en: "Message",
    bs: "Poruka",
  },
  yourName: {
    en: "Your name",
    bs: "Vaše ime",
  },
  yourEmail: {
    en: "your.email@example.com",
    bs: "vas.email@primjer.com",
  },
  yourMessage: {
    en: "Your message...",
    bs: "Vaša poruka...",
  },
  sending: {
    en: "Sending...",
    bs: "Šaljem...",
  },
  sendMessage: {
    en: "Send Message",
    bs: "Pošalji poruku",
  },
  messageSent: {
    en: "Message Sent!",
    bs: "Poruka poslana!",
  },
  thankYou: {
    en: "Thanks for reaching out. I'll get back to you soon.",
    bs: "Hvala što ste me kontaktirali. Odgovorit ću vam uskoro.",
  },
  orEmailMe: {
    en: "Or email me directly at:",
    bs: "Ili me direktno kontaktirajte na:",
  },
  // Footer
  allRightsReserved: {
    en: "All rights reserved.",
    bs: "Sva prava pridržana.",
  },
  // Theme and language
  darkMode: {
    en: "Dark Mode",
    bs: "Tamni način",
  },
  lightMode: {
    en: "Light Mode",
    bs: "Svijetli način",
  },
  language: {
    en: "Language",
    bs: "Jezik",
  },
  english: {
    en: "English",
    bs: "Engleski",
  },
  bosnian: {
    en: "Bosnian",
    bs: "Bosanski",
  },
  // Tech Stack
  techStackTitle: {
    en: "My Tech Stack",
    bs: "Moj Tech Stack",
  },

}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "bs")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
