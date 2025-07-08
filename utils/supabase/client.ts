import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Helper function to get organization by slug (for subdomain routing)
export async function getOrganizationBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', slug)
    .single()
    
  if (error) {
    console.error('Error fetching organization:', error)
    return null
  }
  
  return data
}

// Helper function to get user profile with organization
export async function getUserProfileWithOrg(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles_with_org')
    .select('*')
    .eq('id', userId)
    .single()
    
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Helper function to get published pages for an organization
export async function getPublishedPages(organizationId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('published_pages_with_content')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('is_published', true)
    .order('nav_order', { ascending: true })
    
  if (error) {
    console.error('Error fetching published pages:', error)
    return []
  }
  
  return data
}

// Helper function to get a specific page with sections
export async function getPageWithSections(organizationId: string, slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('published_pages_with_content')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
    
  if (error) {
    console.error('Error fetching page:', error)
    return null
  }
  
  return data
}

// Helper function to get flight statistics
export async function getFlightStatistics(organizationId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .rpc('get_flight_statistics', { org_id: organizationId })
    
  if (error) {
    console.error('Error fetching flight statistics:', error)
    return null
  }
  
  return data?.[0] || null
}

// Helper function to get aviation certifications
export async function getAviationCertifications(organizationId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('aviation_certifications')
    .select('*')
    .eq('organization_id', organizationId)
    .order('issue_date', { ascending: false })
    
  if (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
  
  return data
} 