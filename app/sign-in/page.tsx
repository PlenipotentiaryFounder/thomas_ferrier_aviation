'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/u/' + email.split('@')[0] + '/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo or Icon */}
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/10">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M2 12l10 7 10-7-10-7-10 7z" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/></svg>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign In</h1>
        <p className="text-slate-500 dark:text-slate-300 mb-6 text-center">Access your professional aviation dashboard.</p>
        <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition">Sign In</button>
          {error && <div className="w-full text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 mt-2">{error}</div>}
        </form>
        <p className="mt-6 text-slate-500 dark:text-slate-300 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </main>
  )
} 