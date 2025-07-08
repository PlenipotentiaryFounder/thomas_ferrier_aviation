"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { getOrganizationThemeConfig, generateThemeCSS, type DesignTheme } from '@/lib/theme-system'

interface AviationThemeProviderProps extends ThemeProviderProps {
  organizationId?: string
  children: React.ReactNode
}

interface ThemeContextValue {
  designTheme: DesignTheme | null
  variantPreferences: Record<string, string>
  updateTheme: (themeId: string, preferences?: Record<string, string>) => void
  isLoading: boolean
}

const ThemeContext = React.createContext<ThemeContextValue>({
  designTheme: null,
  variantPreferences: {},
  updateTheme: () => {},
  isLoading: true
})

export function AviationThemeProvider({ 
  organizationId,
  children, 
  ...props 
}: AviationThemeProviderProps) {
  const [designTheme, setDesignTheme] = React.useState<DesignTheme | null>(null)
  const [variantPreferences, setVariantPreferences] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  // Load organization theme configuration
  React.useEffect(() => {
    async function loadThemeConfig() {
      if (!organizationId) {
        setIsLoading(false)
        return
      }

      try {
        const config = await getOrganizationThemeConfig(organizationId)
        setDesignTheme(config.design_theme)
        setVariantPreferences(config.variant_preferences)
      } catch (error) {
        console.error('Failed to load theme configuration:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadThemeConfig()
  }, [organizationId])

  // Apply theme CSS when theme changes
  React.useEffect(() => {
    if (!designTheme) return

    const themeCSS = generateThemeCSS(designTheme, isDarkMode)
    
    // Remove existing theme styles
    const existingThemeStyle = document.getElementById('aviation-theme-styles')
    if (existingThemeStyle) {
      existingThemeStyle.remove()
    }

    // Add new theme styles
    const styleElement = document.createElement('style')
    styleElement.id = 'aviation-theme-styles'
    styleElement.textContent = themeCSS
    document.head.appendChild(styleElement)

    return () => {
      // Cleanup on unmount
      const themeStyle = document.getElementById('aviation-theme-styles')
      if (themeStyle) {
        themeStyle.remove()
      }
    }
  }, [designTheme, isDarkMode])

  // Listen for dark mode changes
  React.useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    // Initial check
    updateDarkMode()

    // Watch for changes
    const observer = new MutationObserver(updateDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const updateTheme = React.useCallback(async (
    themeId: string, 
    preferences: Record<string, string> = {}
  ) => {
    if (!organizationId) return

    try {
      // This would typically update the database
      console.log('Updating theme:', { themeId, preferences })
      setVariantPreferences(prev => ({ ...prev, ...preferences }))
    } catch (error) {
      console.error('Failed to update theme:', error)
    }
  }, [organizationId])

  const contextValue: ThemeContextValue = {
    designTheme,
    variantPreferences,
    updateTheme,
    isLoading
  }

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={contextValue}>
        {/* Inject theme-specific fonts */}
        {designTheme && (
          <>
            {/* Google Fonts for each theme */}
            {designTheme.theme_key === 'aviation_sleek' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
                rel="stylesheet"
              />
            )}
            {designTheme.theme_key === 'aviation_professional' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Source+Code+Pro:wght@300;400;500;600&display=swap"
                rel="stylesheet"
              />
            )}
            {designTheme.theme_key === 'aviation_modern' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
              />
            )}
            {designTheme.theme_key === 'aviation_personable' && (
              <link
                href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500;600&display=swap"
                rel="stylesheet"
              />
            )}
          </>
        )}
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  )
}

export function useAviationTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useAviationTheme must be used within an AviationThemeProvider')
  }
  return context
}

// Legacy ThemeProvider for backward compatibility
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <AviationThemeProvider {...props}>
      {children}
    </AviationThemeProvider>
  )
}
