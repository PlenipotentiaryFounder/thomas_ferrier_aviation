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
      return null
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
      return null
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
    return null
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