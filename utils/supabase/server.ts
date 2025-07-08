import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Server-side helper to get user with organization
export async function getUserWithOrganization() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { user: null, profile: null, organization: null }
  }
  
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles_with_org')
    .select('*')
    .eq('id', user.id)
    .single()
    
  if (profileError) {
    console.error('Error fetching user profile:', profileError)
    return { user, profile: null, organization: null }
  }
  
  const organization = profile ? {
    id: profile.organization_id,
    name: profile.organization_name,
    slug: profile.organization_slug,
    domain: profile.organization_domain,
    subscription_tier: profile.subscription_tier,
    subscription_status: profile.subscription_status
  } : null
  
  return { user, profile, organization }
}

// Server-side helper to check if user is admin
export async function isUserAdmin() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.rpc('is_admin')
  
  if (error) {
    console.error('Error checking admin status:', error)
    return false
  }
  
  return data === true
}

// Server-side helper to get organization by slug
export async function getOrganizationBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .rpc('get_organization_by_slug', { org_slug: slug })
    
  if (error) {
    console.error('Error fetching organization by slug:', error)
    return null
  }
  
  return data?.[0] || null
}

// Server-side helper to create aviation professional account
export async function createAviationProfessional(
  userId: string,
  firstName: string,
  lastName: string,
  orgName: string,
  orgSlug: string,
  email: string
) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .rpc('create_aviation_professional', {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      org_name: orgName,
      org_slug: orgSlug,
      email: email
    })
    
  if (error) {
    console.error('Error creating aviation professional:', error)
    return null
  }
  
  return data
}