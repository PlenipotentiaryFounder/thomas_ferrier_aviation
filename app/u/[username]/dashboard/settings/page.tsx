'use client'

import React, { useEffect, useState } from 'react'
import { createClient, getUserProfileWithOrg } from '@/utils/supabase/client'

export default function SettingsDashboard() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (data?.user) {
        const profileData = await getUserProfileWithOrg(data.user.id)
        if (profileData) {
          setProfile(profileData)
        } else {
          setError('Settings not found.')
        }
      } else {
        setError('You must be logged in to view your settings.')
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading settings...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <span className="font-semibold">Theme:</span> {profile?.theme || 'Default'}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Visibility:</span> {profile?.visibility_settings ? JSON.stringify(profile.visibility_settings) : '—'}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Contact Preferences:</span> {profile?.contact_preferences ? JSON.stringify(profile.contact_preferences) : '—'}
        </div>
        {/* Add more settings fields as needed */}
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled>
            Edit Settings (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  )
} 