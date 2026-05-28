'use client'

import React, { useEffect, useState } from 'react'
import { createClient, getUserProfileWithOrg } from '@/utils/supabase/client'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (data?.user) {
        const profileData = await getUserProfileWithOrg(data.user.id)
        if (profileData) {
          setProfile(profileData)
          setForm({
            name: profileData.name || '',
            bio: profileData.bio || ''
          })
        } else {
          setError('Profile not found.')
        }
      } else {
        setError('You must be logged in to view your profile.')
      }
      setLoading(false)
    })
  }, [])

  const handleEdit = () => {
    setEditing(true)
    setSuccess(null)
    setError(null)
  }

  const handleCancel = () => {
    setEditing(false)
    setForm({
      name: profile?.name || '',
      bio: profile?.bio || ''
    })
    setSuccess(null)
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(null)
    setError(null)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      setError('Not authenticated.')
      setSaving(false)
      return
    }
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ name: form.name, bio: form.bio })
      .eq('user_id', userData.user.id)
    if (updateError) {
      setError('Failed to update profile.')
    } else {
      setSuccess('Profile updated!')
      // Refresh profile data
      const profileData = await getUserProfileWithOrg(userData.user.id)
      setProfile(profileData)
      setEditing(false)
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="bg-white rounded shadow p-6">
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={4}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4">
              <span className="font-semibold">Name:</span> {profile?.name || '—'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Username:</span> {profile?.username || '—'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email:</span> {profile?.email || '—'}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Bio:</span> {profile?.bio || '—'}
            </div>
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 