'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { label: 'Basic Info', required: true },
  { label: 'Professional Details', required: true },
  { label: 'Experience & Certifications', required: true },
  { label: 'Portfolio Setup', required: true },
  { label: 'Review & Confirm', required: false },
]

const urlify = (first: string, last: string) =>
  (first + last).replace(/[^a-zA-Z0-9]/g, '')

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [experience, setExperience] = useState([{ title: '', company: '', period: '', location: '', description: '' }])
  const [certs, setCerts] = useState([{ title: '', type: '', date: '' }])
  const [theme, setTheme] = useState('neural-interface')
  const [pageTitle, setPageTitle] = useState('About')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaKeywords, setMetaKeywords] = useState('')
  const [customCss, setCustomCss] = useState('')

  // Auto-generate username
  useEffect(() => {
    if (firstName && lastName) {
      const uname = urlify(firstName, lastName)
      setUsername(uname)
    }
  }, [firstName, lastName])

  // Validate username uniqueness
  useEffect(() => {
    if (!username) return
    const check = setTimeout(async () => {
      const { data, error } = await supabase.from('profiles').select('username').eq('username', username)
      setUsernameAvailable(!data?.length)
    }, 400)
    return () => clearTimeout(check)
  }, [username])

  // Step navigation
  const goTo = (i: number) => {
    if (i < step && i >= 0) setStep(i)
  }
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  // Validation helpers
  const validateStep = () => {
    if (step === 0) return firstName && lastName && username && email && usernameAvailable
    if (step === 1) return title && location
    if (step === 2) return experience[0].title && experience[0].company && experience[0].period && certs[0].title && certs[0].type && certs[0].date
    if (step === 3) return theme && pageTitle
    return true
  }

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    // 1. Update profile
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) {
      setError('Not authenticated.')
      setLoading(false)
      return
    }
    // Update profiles
    const { error: profileError } = await supabase.from('profiles').update({
      name: firstName + ' ' + lastName,
      username,
      email,
      phone,
      title,
      location,
      bio,
      user_type: 'professional',
    }).eq('user_id', user.id)
    if (profileError) {
      setError('Failed to update profile: ' + profileError.message)
      setLoading(false)
      return
    }
    // Insert experience
    for (const exp of experience) {
      if (exp.title && exp.company && exp.period) {
        await supabase.from('experience').insert({
          user_id: user.id,
          ...exp,
        })
      }
    }
    // Insert certifications
    for (const cert of certs) {
      if (cert.title && cert.type && cert.date) {
        await supabase.from('certifications').insert({
          user_id: user.id,
          ...cert,
        })
      }
    }
    // Insert first page
    await supabase.from('pages').insert({
      user_id: user.id,
      title: pageTitle,
      slug: pageTitle.toLowerCase(),
      content: JSON.stringify({ sections: [] }),
      is_published: true,
      order_index: 0,
      meta_description: metaDescription,
      meta_keywords: metaKeywords ? metaKeywords.split(',').map(k => k.trim()) : null,
      custom_css: customCss,
    })
    // Set theme
    await supabase.from('themes').insert({
      user_id: user.id,
      name: theme,
      is_default: true,
    })
    setSuccess('Onboarding complete! Redirecting...')
    setTimeout(() => router.push(`/u/${username}/dashboard`), 1500)
    setLoading(false)
  }

  // UI
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-5xl bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Side Panel Tabs */}
        <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col py-8 px-4">
          <div className="mb-8 text-2xl font-bold tracking-tight">Onboarding</div>
          {steps.map((s, i) => (
            <button
              key={s.label}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-2 transition-all font-semibold ${i === step ? 'bg-white/20 shadow text-blue-200' : 'hover:bg-blue-800/40 text-blue-100'} ${s.required ? '' : 'opacity-70'}`}
              onClick={() => goTo(i)}
              disabled={i > step}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-200 bg-blue-800/40 font-bold">{i+1}</span>
              {s.label}
              {!s.required && <span className="ml-2 text-xs bg-blue-600/40 px-2 py-0.5 rounded">Optional</span>}
            </button>
          ))}
        </aside>
        {/* Main Content */}
        <section className="flex-1 p-10 flex flex-col">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-200 rounded mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${((step+1)/steps.length)*100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              {/* Step Forms */}
              {step === 0 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
                      <input className="w-full px-4 py-3 rounded-lg border" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">Last Name <span className="text-red-500">*</span></label>
                      <input className="w-full px-4 py-3 rounded-lg border" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Username <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={username} onChange={e => setUsername(e.target.value)} />
                    <div className="text-xs mt-1">
                      {username && (
                        usernameAvailable ? (
                          <span className="text-green-600">Available</span>
                        ) : (
                          <span className="text-red-600">Not available</span>
                        )
                      )}
                    </div>
                    <div className="text-xs mt-1 text-slate-500">Your public URL: <span className="font-mono text-blue-700">/u/{username || 'FirstLast'}</span></div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={email} onChange={e => setEmail(e.target.value)} disabled />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone <span className="text-slate-400">(optional)</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <div>
                    <label className="block font-semibold mb-1">Title <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={title} onChange={e => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Location <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Bio <span className="text-slate-400">(optional)</span></label>
                    <textarea className="w-full px-4 py-3 rounded-lg border" value={bio} onChange={e => setBio(e.target.value)} rows={3} />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <div>
                    <h3 className="font-semibold mb-2">Experience <span className="text-red-500">*</span></h3>
                    {experience.map((exp, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Title" value={exp.title} onChange={e => setExperience(experience.map((ex, j) => j === i ? { ...ex, title: e.target.value } : ex))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Company" value={exp.company} onChange={e => setExperience(experience.map((ex, j) => j === i ? { ...ex, company: e.target.value } : ex))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Period" value={exp.period} onChange={e => setExperience(experience.map((ex, j) => j === i ? { ...ex, period: e.target.value } : ex))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Location (optional)" value={exp.location} onChange={e => setExperience(experience.map((ex, j) => j === i ? { ...ex, location: e.target.value } : ex))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Description (optional)" value={exp.description} onChange={e => setExperience(experience.map((ex, j) => j === i ? { ...ex, description: e.target.value } : ex))} />
                        <button type="button" className="text-red-600" onClick={() => setExperience(experience.filter((_, j) => j !== i))}>✕</button>
                      </div>
                    ))}
                    <button type="button" className="text-blue-600 font-medium" onClick={() => setExperience([...experience, { title: '', company: '', period: '', location: '', description: '' }])}>+ Add Experience</button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Certifications <span className="text-red-500">*</span></h3>
                    {certs.map((cert, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Title" value={cert.title} onChange={e => setCerts(certs.map((c, j) => j === i ? { ...c, title: e.target.value } : c))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Type" value={cert.type} onChange={e => setCerts(certs.map((c, j) => j === i ? { ...c, type: e.target.value } : c))} />
                        <input className="flex-1 px-3 py-2 rounded border" placeholder="Date" type="date" value={cert.date} onChange={e => setCerts(certs.map((c, j) => j === i ? { ...c, date: e.target.value } : c))} />
                        <button type="button" className="text-red-600" onClick={() => setCerts(certs.filter((_, j) => j !== i))}>✕</button>
                      </div>
                    ))}
                    <button type="button" className="text-blue-600 font-medium" onClick={() => setCerts([...certs, { title: '', type: '', date: '' }])}>+ Add Certification</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6 max-w-lg mx-auto">
                  <div>
                    <label className="block font-semibold mb-1">Choose a Theme <span className="text-red-500">*</span></label>
                    <select className="w-full px-4 py-3 rounded-lg border" value={theme} onChange={e => setTheme(e.target.value)}>
                      <option value="neural-interface">Neural Interface</option>
                      <option value="liquid-glass">Liquid Glass</option>
                      <option value="holographic">Holographic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">First Page Title <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" placeholder="About" value={pageTitle} onChange={e => setPageTitle(e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Meta Description <span className="text-slate-400">(optional)</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Meta Keywords <span className="text-slate-400">(optional, comma separated)</span></label>
                    <input className="w-full px-4 py-3 rounded-lg border" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Custom CSS <span className="text-slate-400">(optional)</span></label>
                    <textarea className="w-full px-4 py-3 rounded-lg border" value={customCss} onChange={e => setCustomCss(e.target.value)} rows={2} />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4 max-w-lg mx-auto">
                  <h3 className="font-semibold mb-2">Review Your Info</h3>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded p-4">
                    <div><b>Name:</b> {firstName} {lastName}</div>
                    <div><b>Username:</b> {username}</div>
                    <div><b>Email:</b> {email}</div>
                    <div><b>Phone:</b> {phone}</div>
                    <div><b>Title:</b> {title}</div>
                    <div><b>Location:</b> {location}</div>
                    <div><b>Bio:</b> {bio}</div>
                    <div><b>Experience:</b> {experience.map(e => e.title).join(', ')}</div>
                    <div><b>Certifications:</b> {certs.map(c => c.title).join(', ')}</div>
                    <div><b>Theme:</b> {theme}</div>
                    <div><b>First Page:</b> {pageTitle}</div>
                    <div><b>Meta Description:</b> {metaDescription}</div>
                    <div><b>Meta Keywords:</b> {metaKeywords}</div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button type="button" className="px-6 py-2 rounded bg-slate-300 text-slate-800 font-semibold" onClick={prev} disabled={step === 0}>Back</button>
            {step < steps.length - 1 ? (
              <button type="button" className="px-6 py-2 rounded bg-blue-600 text-white font-semibold" onClick={next} disabled={!validateStep()}>Next</button>
            ) : (
              <button type="button" className="px-6 py-2 rounded bg-green-600 text-white font-semibold" onClick={handleSubmit} disabled={loading || !validateStep()}>{loading ? 'Submitting...' : 'Finish & Launch'}</button>
            )}
          </div>
          {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mt-4 text-green-600 font-semibold">{success}</div>}
        </section>
      </div>
    </main>
  )
} 