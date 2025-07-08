import { createClient } from '@/utils/supabase/client'
import type { OrganizationTheme } from '@/types/database'

export interface DesignTheme {
  id: string
  theme_key: string
  theme_name: string
  theme_category: string
  description: string
  color_schemes: ColorSchemes
  typography_schemes: TypographySchemes
  spacing_schemes: SpacingSchemes
  animation_schemes: AnimationSchemes
  component_style_overrides: any
  is_premium: boolean
}

export interface ColorSchemes {
  primary: { light: string; dark: string }
  secondary: { light: string; dark: string }
  accent: { light: string; dark: string }
  background: { light: string; dark: string }
  surface: { light: string; dark: string }
  text: { light: string; dark: string }
  [key: string]: { light: string; dark: string }
}

export interface TypographySchemes {
  primary: string
  heading: string
  mono: string
  sizes: {
    xs: string; sm: string; base: string; lg: string
    xl: string; '2xl': string; '3xl': string; '4xl': string
    '5xl': string; '6xl': string
  }
}

export interface SpacingSchemes {
  xs: string; sm: string; md: string; lg: string
  xl: string; '2xl': string; '3xl': string; '4xl': string
  section: string; container: string
}

export interface AnimationSchemes {
  speed: 'fast' | 'moderate' | 'slow'
  easing: string
  hover_scale: number
  stagger_delay: number
}

export interface ComponentVariant {
  id: string
  variant_key: string
  variant_name: string
  variant_description: string
  style_config: any
  layout_config: any
  animation_config: any
  responsive_config: ResponsiveConfig
  theme_compatibility: string[]
  is_premium: boolean
}

export interface ResponsiveConfig {
  mobile_text_size: string
  mobile_spacing: string
  mobile_layout: string
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

/**
 * Get all available design themes
 */
export async function getDesignThemes(): Promise<DesignTheme[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('design_themes')
    .select('*')
    .order('theme_name')
  
  if (error) {
    console.error('Error fetching design themes:', error)
    return []
  }
  
  return data || []
}

/**
 * Get component variants for a specific component
 */
export async function getComponentVariants(componentKey: string): Promise<ComponentVariant[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('component_variants')
    .select(`
      *,
      component_definitions!inner (
        component_key
      )
    `)
    .eq('component_definitions.component_key', componentKey)
  
  if (error) {
    console.error('Error fetching component variants:', error)
    return []
  }
  
  return data || []
}

/**
 * Generate CSS custom properties from theme configuration
 */
export function generateThemeCSS(
  theme: DesignTheme, 
  isDarkMode: boolean = false
): string {
  const mode = isDarkMode ? 'dark' : 'light'
  const colors = theme.color_schemes
  const typography = theme.typography_schemes
  const spacing = theme.spacing_schemes
  const animations = theme.animation_schemes
  
  const cssVars = [
    // Colors
    ...Object.entries(colors).map(([key, value]) => 
      `--color-${key.replace('_', '-')}: ${value[mode]};`
    ),
    
    // Typography
    `--font-primary: ${typography.primary};`,
    `--font-heading: ${typography.heading};`,
    `--font-mono: ${typography.mono};`,
    ...Object.entries(typography.sizes).map(([key, value]) => 
      `--text-${key}: ${value};`
    ),
    
    // Spacing
    ...Object.entries(spacing).map(([key, value]) => 
      `--spacing-${key}: ${value};`
    ),
    
    // Animations
    `--animation-speed: ${animations.speed === 'fast' ? '0.2s' : animations.speed === 'moderate' ? '0.3s' : '0.5s'};`,
    `--animation-easing: ${animations.easing};`,
    `--hover-scale: ${animations.hover_scale};`,
    `--stagger-delay: ${animations.stagger_delay}s;`,
  ]
  
  return `:root {\n  ${cssVars.join('\n  ')}\n}`
}

/**
 * Get responsive CSS classes based on component variant
 */
export function getResponsiveClasses(variant: ComponentVariant): string {
  const responsive = variant.responsive_config
  
  const classes = [
    // Mobile text sizing
    responsive.mobile_text_size === 'responsive' ? 'text-sm md:text-base lg:text-lg' : 
    responsive.mobile_text_size === 'optimized' ? 'text-base md:text-lg lg:text-xl' :
    responsive.mobile_text_size === 'friendly' ? 'text-lg md:text-xl lg:text-2xl' : 
    'text-base',
    
    // Mobile spacing
    responsive.mobile_spacing === 'compressed' ? 'p-2 md:p-4 lg:p-6' :
    responsive.mobile_spacing === 'standard' ? 'p-4 md:p-6 lg:p-8' :
    responsive.mobile_spacing === 'comfortable' ? 'p-6 md:p-8 lg:p-12' :
    'p-4',
    
    // Mobile layout
    responsive.mobile_layout === 'stacked' ? 'flex flex-col md:flex-row' :
    responsive.mobile_layout === 'adaptive' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'flex flex-wrap',
  ]
  
  return classes.filter(Boolean).join(' ')
}

/**
 * Get animation CSS classes based on variant configuration
 */
export function getAnimationClasses(variant: ComponentVariant): string {
  const animation = variant.animation_config
  
  const classes = [
    // Entrance animations
    animation.entrance === 'slide_up_fade' ? 'animate-slide-up-fade' :
    animation.entrance === 'fade_in' ? 'animate-fade-in' :
    animation.entrance === 'bounce_in' ? 'animate-bounce-in' :
    '',
    
    // Hover effects
    animation.hover_effects === 'scale_glow' ? 'hover:scale-105 hover:shadow-glow transition-all duration-300' :
    animation.hover_effects === 'subtle_scale' ? 'hover:scale-102 transition-transform duration-200' :
    animation.hover_effects === 'gentle_lift' ? 'hover:translate-y-1 hover:shadow-lg transition-all duration-300' :
    '',
    
    // Parallax
    animation.parallax ? 'parallax-element' : '',
    
    // Stagger children
    animation.stagger_children ? 'stagger-children' : '',
  ]
  
  return classes.filter(Boolean).join(' ')
}

/**
 * Apply theme configuration to organization
 */
export async function applyThemeToOrganization(
  organizationId: string,
  themeId: string,
  variantPreferences: Record<string, string> = {}
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('organization_themes')
    .upsert({
      organization_id: organizationId,
      design_theme_id: themeId,
      variant_preferences: variantPreferences,
      is_active: true,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  if (error) {
    throw new Error(`Error applying theme: ${error.message}`)
  }
  
  return data
}

/**
 * Get the complete theme configuration for an organization
 */
export async function getOrganizationThemeConfig(organizationId: string) {
  const supabase = createClient()
  
  const { data: orgTheme, error } = await supabase
    .from('organization_themes')
    .select(`
      *,
      design_themes (*)
    `)
    .eq('organization_id', organizationId)
    .eq('is_active', true)
    .single()
  
  if (error || !orgTheme) {
    // Return default theme
    const { data: defaultTheme } = await supabase
      .from('design_themes')
      .select('*')
      .eq('theme_key', 'aviation_professional')
      .single()
    
    return {
      organization_theme: null,
      design_theme: defaultTheme,
      variant_preferences: {}
    }
  }
  
  return {
    organization_theme: orgTheme,
    design_theme: orgTheme.design_themes,
    variant_preferences: orgTheme.variant_preferences || {}
  }
}

/**
 * Aviation-specific utility classes for components
 */
export const AVIATION_CLASSES = {
  // Cockpit-inspired styles
  cockpit: {
    panel: 'bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-600 rounded-lg',
    display: 'bg-black text-green-400 font-mono text-sm p-2 rounded border border-green-600',
    button: 'bg-orange-600 hover:bg-orange-500 text-white border-2 border-orange-400 rounded-full',
    indicator: 'w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-green-400/50 shadow-lg'
  },
  
  // Aircraft-inspired elements
  aircraft: {
    wing: 'relative before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent',
    fuselage: 'rounded-full bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-inner',
    propeller: 'animate-spin-slow origin-center',
    trail: 'relative after:absolute after:top-1/2 after:left-full after:w-20 after:h-px after:bg-gradient-to-r after:from-primary after:to-transparent'
  },
  
  // Sky and weather effects
  atmosphere: {
    clouds: 'bg-gradient-to-t from-blue-100 to-white opacity-80',
    sunrise: 'bg-gradient-to-t from-orange-200 via-yellow-100 to-blue-200',
    sunset: 'bg-gradient-to-t from-purple-200 via-orange-200 to-blue-300',
    night: 'bg-gradient-to-t from-indigo-900 via-purple-900 to-black'
  },
  
  // Glass cockpit inspired
  glass: {
    display: 'bg-black/90 backdrop-blur border border-cyan-400/30 rounded-lg shadow-cyan-400/20 shadow-lg',
    hud: 'text-cyan-400 font-mono text-xs tracking-wider',
    radar: 'bg-radial-gradient from-green-400/20 to-transparent rounded-full',
    gauge: 'relative overflow-hidden rounded-full border-4 border-gray-300'
  }
}

export default {
  getDesignThemes,
  getComponentVariants,
  generateThemeCSS,
  getResponsiveClasses,
  getAnimationClasses,
  applyThemeToOrganization,
  getOrganizationThemeConfig,
  AVIATION_CLASSES
} 