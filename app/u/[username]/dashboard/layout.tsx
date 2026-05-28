'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient, getUserProfileWithOrg } from '@/utils/supabase/client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [unauthorized, setUnauthorized] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (data?.user) {
        setUser(data.user)
        // Fetch user profile (assume it includes username)
        try {
          const profileData = await getUserProfileWithOrg(data.user.id)
          if (!profileData || Object.keys(profileData).length === 0) {
            setProfileError('Profile not found. Please complete onboarding or contact support.')
          } else {
            setProfile(profileData)
            // Extract [username] from the URL
            const match = pathname.match(/\/u\/([^/]+)/)
            const urlUsername = match ? match[1] : null
            if (urlUsername && profileData?.username && urlUsername !== profileData.username) {
              setUnauthorized(true)
            }
          }
        } catch (e) {
          setProfileError('Error loading profile. Please try again.')
        }
      }
      setLoading(false)
    })
  }, [pathname])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!user) {
    return <div className="p-8 text-center text-red-600 font-semibold">You must be logged in to access your dashboard.</div>
  }

  if (unauthorized) {
    return <div className="p-8 text-center text-red-600 font-semibold">You are not authorized to access this dashboard.</div>
  }

  if (profileError) {
    return <div className="p-8 text-center text-red-600 font-semibold">{profileError}</div>
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link href={`/u/${profile?.username}/dashboard/profile`} className="text-blue-700 hover:underline">Profile</Link></li>
            <li><Link href={`/u/${profile?.username}/dashboard/pages`} className="text-blue-700 hover:underline">Pages</Link></li>
            <li><Link href={`/u/${profile?.username}/dashboard/media`} className="text-blue-700 hover:underline">Media</Link></li>
            <li><Link href={`/u/${profile?.username}/dashboard/analytics`} className="text-blue-700 hover:underline">Analytics</Link></li>
            <li><Link href={`/u/${profile?.username}/dashboard/settings`} className="text-blue-700 hover:underline">Settings</Link></li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="mt-12 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">Log Out</button>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
} 