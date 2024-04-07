import { createContext, useContext, useState, useEffect } from 'react'

const KEY_PERSIST = 'theme'

const ThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: (newTheme: string) => {}
})

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode
}) {
  const persistedTheme = localStorage.getItem(KEY_PERSIST)
  const [theme, setTheme] = useState(persistedTheme || 'light')

  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem(KEY_PERSIST, newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none')
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 1)

    return () => clearTimeout(transitionTimeout)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeProvider = () => useContext(ThemeContext)
