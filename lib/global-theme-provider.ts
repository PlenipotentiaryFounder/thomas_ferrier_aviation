import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 2025 Cutting-Edge Design Variants
export type DesignVariant = 
  | 'neural-interface'
  | 'liquid-glass' 
  | 'holographic'
  | 'bio-symbiotic'
  | 'volumetric'
  | 'tangible'

// Component types that can have variants
export type ComponentType = 
  | 'hero'
  | 'about'
  | 'stats'
  | 'navigation'
  | 'cards'
  | 'forms'
  | 'dashboard'
  | 'gallery'
  | 'timeline'

// Global theme configuration
export interface GlobalThemeConfig {
  primaryVariant: DesignVariant
  componentVariants: Record<ComponentType, DesignVariant>
  customizations: {
    primaryColor?: string
    accentColor?: string
    fontSize?: 'compact' | 'standard' | 'comfortable'
    animationIntensity?: 'subtle' | 'moderate' | 'intense'
    glassOpacity?: number
    neuralPulseSpeed?: number
    holographicIntensity?: number
    bioResponseRate?: number
  }
}

// Default theme configuration
const defaultThemeConfig: GlobalThemeConfig = {
  primaryVariant: 'neural-interface',
  componentVariants: {
    hero: 'neural-interface',
    about: 'liquid-glass',
    stats: 'bio-symbiotic',
    navigation: 'volumetric',
    cards: 'holographic',
    forms: 'tangible',
    dashboard: 'neural-interface',
    gallery: 'liquid-glass',
    timeline: 'holographic'
  },
  customizations: {
    fontSize: 'standard',
    animationIntensity: 'moderate',
    glassOpacity: 0.1,
    neuralPulseSpeed: 3,
    holographicIntensity: 0.8,
    bioResponseRate: 1.2
  }
}

// Theme context
interface GlobalThemeContextValue {
  themeConfig: GlobalThemeConfig
  updateVariant: (componentType: ComponentType, variant: DesignVariant) => void
  updatePrimaryVariant: (variant: DesignVariant) => void
  updateCustomization: (key: keyof GlobalThemeConfig['customizations'], value: any) => void
  applyVariantToAll: (variant: DesignVariant) => void
  resetToDefaults: () => void
  isTransitioning: boolean
}

const GlobalThemeContext = createContext<GlobalThemeContextValue | null>(null)

// Provider component
interface GlobalThemeProviderProps {
  children: ReactNode
  initialConfig?: Partial<GlobalThemeConfig>
}

export function GlobalThemeProvider({ children, initialConfig }: GlobalThemeProviderProps) {
  const [themeConfig, setThemeConfig] = useState<GlobalThemeConfig>({
    ...defaultThemeConfig,
    ...initialConfig
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Apply theme CSS variables when config changes
  useEffect(() => {
    setIsTransitioning(true)
    const timeout = setTimeout(() => setIsTransitioning(false), 300)

    // Generate CSS custom properties based on current theme
    const cssVars = generateThemeVariables(themeConfig)
    
    // Remove existing theme styles
    const existingStyle = document.getElementById('global-theme-vars')
    if (existingStyle) {
      existingStyle.remove()
    }

    // Add new theme styles
    const styleElement = document.createElement('style')
    styleElement.id = 'global-theme-vars'
    styleElement.textContent = `:root { ${cssVars.join(' ')} }`
    document.head.appendChild(styleElement)

    // Store in localStorage for persistence
    localStorage.setItem('global-theme-config', JSON.stringify(themeConfig))

    return () => clearTimeout(timeout)
  }, [themeConfig])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('global-theme-config')
    if (stored) {
      try {
        const config = JSON.parse(stored)
        setThemeConfig({ ...defaultThemeConfig, ...config })
      } catch (error) {
        console.error('Failed to load stored theme config:', error)
      }
    }
  }, [])

  const updateVariant = (componentType: ComponentType, variant: DesignVariant) => {
    setThemeConfig(prev => ({
      ...prev,
      componentVariants: {
        ...prev.componentVariants,
        [componentType]: variant
      }
    }))
  }

  const updatePrimaryVariant = (variant: DesignVariant) => {
    setThemeConfig(prev => ({
      ...prev,
      primaryVariant: variant
    }))
  }

  const updateCustomization = (key: keyof GlobalThemeConfig['customizations'], value: any) => {
    setThemeConfig(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [key]: value
      }
    }))
  }

  const applyVariantToAll = (variant: DesignVariant) => {
    setThemeConfig(prev => ({
      ...prev,
      primaryVariant: variant,
      componentVariants: Object.keys(prev.componentVariants).reduce((acc, key) => ({
        ...acc,
        [key]: variant
      }), {} as Record<ComponentType, DesignVariant>)
    }))
  }

  const resetToDefaults = () => {
    setThemeConfig(defaultThemeConfig)
  }

  const contextValue: GlobalThemeContextValue = {
    themeConfig,
    updateVariant,
    updatePrimaryVariant,
    updateCustomization,
    applyVariantToAll,
    resetToDefaults,
    isTransitioning
  }

  return (
    <GlobalThemeContext.Provider value={contextValue}>
      {children}
    </GlobalThemeContext.Provider>
  )
}

// Hook to use the global theme
export function useGlobalTheme() {
  const context = useContext(GlobalThemeContext)
  if (!context) {
    throw new Error('useGlobalTheme must be used within a GlobalThemeProvider')
  }
  return context
}

// Generate CSS variables from theme config
function generateThemeVariables(config: GlobalThemeConfig): string[] {
  const vars: string[] = []
  
  // Primary variant
  vars.push(`--primary-variant: ${config.primaryVariant};`)
  
  // Component variants
  Object.entries(config.componentVariants).forEach(([component, variant]) => {
    vars.push(`--${component}-variant: ${variant};`)
  })
  
  // Customizations
  Object.entries(config.customizations).forEach(([key, value]) => {
    if (value !== undefined) {
      vars.push(`--theme-${kebabCase(key)}: ${value};`)
    }
  })
  
  // Variant-specific CSS variables
  vars.push(...getVariantSpecificVars(config.primaryVariant))
  
  return vars
}

// Get variant-specific CSS variables
function getVariantSpecificVars(variant: DesignVariant): string[] {
  const baseVars = [
    '--transition-duration: 0.3s;',
    '--transition-timing: cubic-bezier(0.4, 0, 0.2, 1);'
  ]

  switch (variant) {
    case 'neural-interface':
      return [
        ...baseVars,
        '--neural-glow: rgba(59, 130, 246, 0.3);',
        '--neural-pulse: 0 0 20px rgba(59, 130, 246, 0.4);',
        '--neural-bg: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%);'
      ]
    
    case 'liquid-glass':
      return [
        ...baseVars,
        '--glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);',
        '--glass-blur: blur(40px) saturate(180%);',
        '--glass-border: 1px solid rgba(255, 255, 255, 0.2);'
      ]
    
    case 'holographic':
      return [
        ...baseVars,
        '--holo-bg: linear-gradient(45deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%);',
        '--holo-glow: 0 0 60px rgba(168, 85, 247, 0.3);',
        '--holo-shift: hue-rotate(15deg) saturate(140%);'
      ]
    
    case 'bio-symbiotic':
      return [
        ...baseVars,
        '--bio-pulse: rgba(34, 197, 94, 0.3);',
        '--bio-glow: 0 0 25px rgba(34, 197, 94, 0.3);',
        '--bio-bg: radial-gradient(ellipse at center, rgba(34, 197, 94, 0.1) 0%, transparent 60%);'
      ]
    
    case 'volumetric':
      return [
        ...baseVars,
        '--volumetric-depth: perspective(1000px);',
        '--volumetric-transform: translateZ(0);',
        '--volumetric-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);'
      ]
    
    case 'tangible':
      return [
        ...baseVars,
        '--tangible-elevation: 0 8px 32px rgba(0, 0, 0, 0.12);',
        '--tangible-press: 0 2px 8px rgba(0, 0, 0, 0.15);',
        '--tangible-hover: 0 12px 48px rgba(0, 0, 0, 0.18);'
      ]
    
    default:
      return baseVars
  }
}

// Utility function to convert camelCase to kebab-case
function kebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

// Hook to get variant-specific CSS classes
export function useVariantClasses(componentType: ComponentType): string {
  const { themeConfig } = useGlobalTheme()
  const variant = themeConfig.componentVariants[componentType]
  
  const baseClasses = 'transition-all duration-300 ease-out'
  
  switch (variant) {
    case 'neural-interface':
      return `${baseClasses} neural-interface neural-pulse bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20`
    
    case 'liquid-glass':
      return `${baseClasses} liquid-glass backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20`
    
    case 'holographic':
      return `${baseClasses} holographic bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-purple-500/30`
    
    case 'bio-symbiotic':
      return `${baseClasses} bio-symbiotic bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30`
    
    case 'volumetric':
      return `${baseClasses} volumetric-depth transform-gpu preserve-3d shadow-2xl`
    
    case 'tangible':
      return `${baseClasses} shadow-lg hover:shadow-xl active:shadow-md transform hover:-translate-y-1 active:translate-y-0`
    
    default:
      return baseClasses
  }
} 