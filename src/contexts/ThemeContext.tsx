'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'amoled'
type AccentColor = 'blue' | 'green' | 'purple' | 'pink' | 'orange'

interface ThemeContextType {
  theme: Theme
  accentColor: AccentColor
  setTheme: (theme: Theme) => void
  setAccentColor: (color: AccentColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes = {
  dark: {
    bg: '#000000',
    bgGradient: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)',
    card: '#1C1C1E',
    cardGradient: 'linear-gradient(135deg, #1C1C1E 0%, #252527 100%)',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  },
  light: {
    bg: '#FFFFFF',
    bgGradient: 'linear-gradient(to bottom, #FFFFFF 0%, #F5F5F7 100%)',
    card: '#F2F2F7',
    cardGradient: 'linear-gradient(135deg, #F2F2F7 0%, #E5E5EA 100%)',
    text: '#000000',
    textSecondary: '#8E8E93',
  },
  amoled: {
    bg: '#000000',
    bgGradient: 'linear-gradient(to bottom, #000000 0%, #000000 100%)',
    card: '#0A0A0A',
    cardGradient: 'linear-gradient(135deg, #0A0A0A 0%, #141414 100%)',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
  },
}

const accentColors = {
  blue: '#0A84FF',
  green: '#30D158',
  purple: '#8B7FFF',
  pink: '#FF6B9F',
  orange: '#FFB76B',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [accentColor, setAccentColorState] = useState<AccentColor>('blue')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Загрузка сохраненных настроек
    const savedTheme = localStorage.getItem('theme') as Theme
    const savedAccent = localStorage.getItem('accentColor') as AccentColor

    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
    if (savedAccent && accentColors[savedAccent]) {
      setAccentColorState(savedAccent)
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Применение темы к CSS переменным
    const root = document.documentElement
    const currentTheme = themes[theme]
    const currentAccent = accentColors[accentColor]

    root.style.setProperty('--bg-color', currentTheme.bg)
    root.style.setProperty('--bg-gradient', currentTheme.bgGradient)
    root.style.setProperty('--card-color', currentTheme.card)
    root.style.setProperty('--card-gradient', currentTheme.cardGradient)
    root.style.setProperty('--text-color', currentTheme.text)
    root.style.setProperty('--text-secondary', currentTheme.textSecondary)
    root.style.setProperty('--accent-color', currentAccent)
  }, [theme, accentColor, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const setAccentColor = (newColor: AccentColor) => {
    setAccentColorState(newColor)
    localStorage.setItem('accentColor', newColor)
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, accentColor, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

