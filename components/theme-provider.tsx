'use client'

import * as React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState<string>(defaultTheme)

  React.useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or system preference
    const storedTheme = localStorage?.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    } else if (enableSystem) {
      const isDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = isDark ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [enableSystem])

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage?.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      return newTheme
    })
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
