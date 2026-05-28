'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function MediaDashboard() {
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (data?.user) {
        const { data: userMedia, error: mediaError } = await supabase
          .from('media')
          .select('*')
          .eq('user_id', data.user.id)
          .order('created_at', { ascending: false })
        if (mediaError) {
          setError('Error fetching media.')
        } else {
          setMedia(userMedia || [])
        }
      } else {
        setError('You must be logged in to view your media.')
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading media...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Media Library</h2>
      <div className="bg-white rounded shadow p-6">
        {media.length === 0 ? (
          <div>No media files found. (You can upload media soon!)</div>
        ) : (
          <ul className="divide-y">
            {media.map((file: any) => (
              <li key={file.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{file.url}</span>
                  <span className="ml-2 text-gray-500 text-sm">{file.type || 'unknown'}</span>
                  <span className="ml-2 text-gray-400 text-xs">{file.size ? `${file.size} bytes` : ''}</span>
                  <span className="ml-2 text-gray-400 text-xs">{file.created_at ? new Date(file.created_at).toLocaleString() : ''}</span>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm" disabled>
                  View (Coming Soon)
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled>
            Upload Media (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  )
} 