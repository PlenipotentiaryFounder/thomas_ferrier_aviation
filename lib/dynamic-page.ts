import { createClient } from '@/utils/supabase/client'
import type { 
  Organization, 
  Page, 
  ComponentInstance, 
  ComponentDefinition,
  NavigationMenu,
  OrganizationTheme 
} from '@/types/database'

export interface PageConfiguration {
  page: Page & {
    components: Array<ComponentInstance & {
      definition: ComponentDefinition
    }>
  }
  organization: Organization
  navigation: NavigationMenu | null
  theme: OrganizationTheme | null
}

export interface ComponentData {
  instance_key: string
  component_key: string
  component_name: string
  component_category: string
  configuration: any
  display_order: number
  is_visible: boolean
}

/**
 * Fetch complete page configuration including all components and settings
 */
export async function getPageConfiguration(
  organizationSlug: string, 
  pageSlug: string
): Promise<PageConfiguration | null> {
  const supabase = createClient()
  
  try {
    // 1. Get organization by slug
    const { data: organization, error: orgError } = await supabase
      .rpc('get_organization_by_slug', { org_slug: organizationSlug })
    
    if (orgError || !organization) {
      console.error('Organization not found:', orgError)
      // Fallback to example data for thomas-ferrier
      return getFallbackPageConfiguration(organizationSlug, pageSlug)
    }

    // 2. Get page with all component instances and definitions
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select(`
        *,
        component_instances!inner (
          id,
          instance_key,
          configuration,
          display_order,
          is_visible,
          is_enabled,
          component_definitions!inner (
            component_key,
            component_name,
            component_category,
            default_config,
            configurable_fields,
            is_premium
          )
        )
      `)
      .eq('organization_id', organization.id)
      .eq('slug', pageSlug)
      .eq('is_published', true)
      .eq('component_instances.is_enabled', true)
      .order('component_instances.display_order', { ascending: true })
      .single()

    if (pageError || !pageData) {
      console.error('Page not found:', pageError)
      // Fallback to example data
      return getFallbackPageConfiguration(organizationSlug, pageSlug)
    }

    // 3. Get navigation configuration
    const { data: navigation } = await supabase
      .rpc('get_navigation_config', { org_id: organization.id })

    // 4. Get theme configuration
    const { data: theme } = await supabase
      .from('organization_themes')
      .select('*')
      .eq('organization_id', organization.id)
      .eq('is_active', true)
      .single()

    // Transform the data structure
    const components = pageData.component_instances.map((instance: any) => ({
      ...instance,
      definition: instance.component_definitions
    }))

    return {
      page: {
        ...pageData,
        components
      },
      organization,
      navigation,
      theme
    }
  } catch (error) {
    console.error('Error fetching page configuration:', error)
    // Fallback to example data
    return getFallbackPageConfiguration(organizationSlug, pageSlug)
  }
}

/**
 * Fallback page configuration for demo/example users
 */
function getFallbackPageConfiguration(organizationSlug: string, pageSlug: string): PageConfiguration | null {
  // Only provide fallback for thomas-ferrier example
  if (organizationSlug !== 'thomas-ferrier') {
    return null
  }

  const exampleOrganization = {
    id: 'example-org-id',
    name: 'Thomas Ferrier',
    slug: 'thomas-ferrier',
    domain: null,
    subscription_tier: 'professional',
    subscription_status: 'active',
    primary_color: '#1e40af',
    secondary_color: '#64748b',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const exampleTheme = {
    id: 'example-theme-id',
    organization_id: 'example-org-id',
    theme_name: 'Neural Interface',
    theme_key: 'neural-interface',
    color_palette: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280'
    },
    typography: {
      fontFamily: 'Inter',
      headingFont: 'Space Grotesk'
    },
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const pageConfigs: Record<string, any> = {
    home: {
      title: 'Home',
      slug: 'home',
      components: [
        {
          id: 'hero-1',
          instance_key: 'main-hero',
          configuration: {
            title: 'Thomas Ferrier',
            subtitle: 'Certified Flight Instructor & Aviation Innovator',
            description: 'Passionate about aviation safety, advanced flight training, and inspiring the next generation of pilots.',
            backgroundImage: '/images/hero-poster.jpg',
            ctaText: 'View Experience',
            ctaLink: '/u/thomas-ferrier/experience'
          },
          display_order: 1,
          is_visible: true,
          is_enabled: true,
          definition: {
            component_key: 'hero_aviation',
            component_name: 'Aviation Hero',
            component_category: 'hero'
          }
        },
        {
          id: 'about-1',
          instance_key: 'about-section',
          configuration: {
            title: 'About Thomas',
            content: 'With over a decade of aviation experience, Thomas Ferrier has dedicated his career to advancing flight safety and training excellence.',
            stats: [
              { label: 'Flight Hours', value: '2,847' },
              { label: 'Students Trained', value: '156' },
              { label: 'Years Experience', value: '12' }
            ]
          },
          display_order: 2,
          is_visible: true,
          is_enabled: true,
          definition: {
            component_key: 'about_professional',
            component_name: 'Professional About',
            component_category: 'content'
          }
        }
      ]
    },
    about: {
      title: 'About',
      slug: 'about',
      components: [
        {
          id: 'about-hero-1',
          instance_key: 'about-hero',
          configuration: {
            title: 'About Thomas Ferrier',
            subtitle: 'Aviation Professional & Innovator',
            description: 'Dedicated to excellence in flight training and aviation safety.'
          },
          display_order: 1,
          is_visible: true,
          is_enabled: true,
          definition: {
            component_key: 'hero_simple',
            component_name: 'Simple Hero',
            component_category: 'hero'
          }
        }
      ]
    },
    experience: {
      title: 'Experience',
      slug: 'experience',
      components: [
        {
          id: 'exp-hero-1',
          instance_key: 'experience-hero',
          configuration: {
            title: 'Flight Experience',
            subtitle: 'Professional Aviation Background',
            description: 'Comprehensive flight training and operational experience.'
          },
          display_order: 1,
          is_visible: true,
          is_enabled: true,
          definition: {
            component_key: 'hero_simple',
            component_name: 'Simple Hero',
            component_category: 'hero'
          }
        }
      ]
    }
  }

  const currentPage = pageConfigs[pageSlug]
  if (!currentPage) {
    return null
  }

  return {
    page: {
      id: `page-${pageSlug}`,
      organization_id: 'example-org-id',
      title: currentPage.title,
      slug: currentPage.slug,
      meta_description: `${currentPage.title} - Thomas Ferrier Aviation Professional`,
      is_published: true,
      is_visible_in_nav: true,
      nav_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      components: currentPage.components
    },
    organization: exampleOrganization,
    navigation: {
      id: 'example-nav',
      organization_id: 'example-org-id',
      menu_type: 'primary',
      menu_items: [
        { label: 'Home', slug: 'home', order: 1 },
        { label: 'About', slug: 'about', order: 2 },
        { label: 'Experience', slug: 'experience', order: 3 },
        { label: 'Certifications', slug: 'certifications', order: 4 },
        { label: 'Contact', slug: 'contact', order: 5 }
      ]
    },
    theme: exampleTheme
  }
}

/**
 * Get available components for an organization based on their subscription
 */
export async function getAvailableComponents(organizationId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .rpc('get_available_components', { org_id: organizationId })
  
  if (error) {
    console.error('Error fetching available components:', error)
    return []
  }
  
  return data || []
}

/**
 * Create a new component instance for a page
 */
export async function createComponentInstance(
  organizationId: string,
  pageId: string,
  componentKey: string,
  instanceKey: string,
  configuration: any = {},
  displayOrder: number = 0
) {
  const supabase = createClient()
  
  // First get the component definition
  const { data: definition, error: defError } = await supabase
    .from('component_definitions')
    .select('id, default_config')
    .eq('component_key', componentKey)
    .single()
  
  if (defError || !definition) {
    throw new Error(`Component definition not found: ${componentKey}`)
  }
  
  // Merge default config with user configuration
  const finalConfig = {
    ...definition.default_config,
    ...configuration
  }
  
  const { data, error } = await supabase
    .from('component_instances')
    .insert({
      organization_id: organizationId,
      page_id: pageId,
      component_definition_id: definition.id,
      instance_key: instanceKey,
      configuration: finalConfig,
      display_order: displayOrder
    })
    .select()
    .single()
  
  if (error) {
    throw new Error(`Error creating component instance: ${error.message}`)
  }
  
  return data
}

/**
 * Update a component instance configuration
 */
export async function updateComponentInstance(
  instanceId: string,
  configuration: any
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('component_instances')
    .update({ 
      configuration,
      updated_at: new Date().toISOString()
    })
    .eq('id', instanceId)
    .select()
    .single()
  
  if (error) {
    throw new Error(`Error updating component instance: ${error.message}`)
  }
  
  return data
}

/**
 * Get organization theme or return default theme
 */
export function getThemeVariables(theme: OrganizationTheme | null) {
  const defaultTheme = {
    primary: '#1e40af',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280'
  }
  
  const colorPalette = theme?.color_palette as any || defaultTheme
  
  return {
    '--color-primary': colorPalette.primary,
    '--color-secondary': colorPalette.secondary,
    '--color-accent': colorPalette.accent,
    '--color-background': colorPalette.background,
    '--color-surface': colorPalette.surface,
    '--color-text': colorPalette.text,
    '--color-text-secondary': colorPalette.textSecondary,
  }
}

/**
 * Generate navigation items from database configuration
 */
export function generateNavigationItems(navigation: NavigationMenu | null, pages: Page[] = []) {
  if (navigation?.menu_items) {
    return navigation.menu_items as any[]
  }
  
  // Fallback: generate from published pages
  return pages
    .filter(page => page.is_published && page.is_visible_in_nav)
    .sort((a, b) => (a.nav_order || 0) - (b.nav_order || 0))
    .map(page => ({
      label: page.title,
      slug: page.slug,
      order: page.nav_order || 0
    }))
} 