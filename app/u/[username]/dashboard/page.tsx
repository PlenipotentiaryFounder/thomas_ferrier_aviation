import React from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Professional Dashboard</h1>
      <nav className="mb-8">
        <ul className="space-y-3">
          <li><Link href="/u/[username]/dashboard/profile" className="text-blue-600 hover:underline">Profile</Link></li>
          <li><Link href="/u/[username]/dashboard/pages" className="text-blue-600 hover:underline">Pages</Link></li>
          <li><Link href="/u/[username]/dashboard/media" className="text-blue-600 hover:underline">Media</Link></li>
          <li><Link href="/u/[username]/dashboard/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
          <li><Link href="/u/[username]/dashboard/settings" className="text-blue-600 hover:underline">Settings</Link></li>
        </ul>
      </nav>
      <div className="bg-white rounded shadow p-6">
        <p>Welcome to your dashboard! Use the navigation above to manage your professional portfolio site.</p>
      </div>
    </div>
  )
} 