import DynamicPage from '@/components/dynamic/dynamic-page'
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { createClient } from '@/utils/supabase/server'

interface UserSubPageProps {
  params: {
    username: string
    page: string
  }
}

export async function generateMetadata({ params }: UserSubPageProps): Promise<Metadata> {
  return {
    title: `${params.page} | ${params.username}`,
    description: `${params.page} page for ${params.username}`,
  }
}

export default async function UserSubPage({ params }: UserSubPageProps) {
  const supabase = await createClient()

  // 1. Look up the user by username
  const { data: userProfile, error: userError } = await supabase
    .from('profiles')
    .select('id, name, username, bio')
    .eq('username', params.username)
    .single()
  if (userError || !userProfile) {
    notFound()
  }

  // 2. Fetch the requested page by slug and user_id
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('user_id', userProfile.id)
    .eq('slug', params.page)
    .eq('is_published', true)
    .single()
  if (pageError || !page) {
    notFound()
  }

  // 3. Parse the page content/config for DynamicPage
  let pageConfig
  try {
    pageConfig = typeof page.content === 'string' ? JSON.parse(page.content) : page.content
  } catch (e) {
    pageConfig = null
  }
  if (!pageConfig) {
    // fallback: show error or not found
    notFound()
  }

  // 4. Add user/org info to config if needed
  pageConfig.organization = {
    id: userProfile.id,
    name: userProfile.name,
    username: userProfile.username,
    // Add more org/user fields as needed
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      <div className="w-full">
        <DynamicPage pageConfig={pageConfig} />
      </div>
    </main>
  )
} 