'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (data?.user) {
        const { data: userAnalytics, error: analyticsError } = await supabase
          .from('analytics')
          .select('*')
          .eq('user_id', data.user.id)
          .order('created_at', { ascending: false })
          .limit(20)
        if (analyticsError) {
          setError('Error fetching analytics.')
        } else {
          setAnalytics(userAnalytics || [])
        }
      } else {
        setError('You must be logged in to view your analytics.')
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading analytics...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Site Analytics</h2>
      <div className="bg-white rounded shadow p-6">
        {analytics.length === 0 ? (
          <div>No analytics events found. (Charts and insights coming soon!)</div>
        ) : (
          <ul className="divide-y">
            {analytics.map((event: any) => (
              <li key={event.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{event.event_type}</span>
                  <span className="ml-2 text-gray-500 text-sm">Page: {event.page_id || '—'}</span>
                  <span className="ml-2 text-gray-400 text-xs">{event.created_at ? new Date(event.created_at).toLocaleString() : ''}</span>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm" disabled>
                  Details (Coming Soon)
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-gray-500 text-sm">
          Analytics charts and insights will be available soon.
        </div>
      </div>
    </div>
  )
} 