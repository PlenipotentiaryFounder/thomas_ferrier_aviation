'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function PagesDashboard() {
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', is_published: false })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchPages = async () => {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      setError('You must be logged in to view your pages.')
      setLoading(false)
      return
    }
    const { data: userPages, error: pagesError } = await supabase
      .from('pages')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('order_index', { ascending: true })
    if (pagesError) {
      setError('Error fetching pages.')
    } else {
      setPages(userPages || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPages()
    // eslint-disable-next-line
  }, [])

  const handleAdd = () => {
    setAdding(true)
    setEditingId(null)
    setForm({ title: '', slug: '', is_published: false })
    setSuccess(null)
    setError(null)
  }

  const handleEdit = (page: any) => {
    setEditingId(page.id)
    setAdding(false)
    setForm({ title: page.title, slug: page.slug, is_published: page.is_published })
    setSuccess(null)
    setError(null)
  }

  const handleCancel = () => {
    setAdding(false)
    setEditingId(null)
    setForm({ title: '', slug: '', is_published: false })
    setSuccess(null)
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
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
    if (adding) {
      const { error: insertError } = await supabase
        .from('pages')
        .insert({
          user_id: userData.user.id,
          title: form.title,
          slug: form.slug,
          is_published: form.is_published,
          order_index: pages.length
        })
      if (insertError) {
        setError('Failed to add page.')
      } else {
        setSuccess('Page added!')
        setAdding(false)
        setForm({ title: '', slug: '', is_published: false })
        fetchPages()
      }
    } else if (editingId) {
      const { error: updateError } = await supabase
        .from('pages')
        .update({
          title: form.title,
          slug: form.slug,
          is_published: form.is_published
        })
        .eq('id', editingId)
      if (updateError) {
        setError('Failed to update page.')
      } else {
        setSuccess('Page updated!')
        setEditingId(null)
        setForm({ title: '', slug: '', is_published: false })
        fetchPages()
      }
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    setSuccess(null)
    setError(null)
    const supabase = createClient()
    const { error: deleteError } = await supabase
      .from('pages')
      .delete()
      .eq('id', deleteId)
    if (deleteError) {
      setError('Failed to delete page.')
    } else {
      setSuccess('Page deleted!')
      fetchPages()
    }
    setDeleteId(null)
    setDeleting(false)
  }

  const cancelDelete = () => {
    setDeleteId(null)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading pages...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Manage Portfolio Pages</h2>
      <div className="bg-white rounded shadow p-6">
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        {(adding || editingId) ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                id="is_published"
              />
              <label htmlFor="is_published" className="font-semibold">Published</label>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={saving}>
                {saving ? 'Saving...' : (adding ? 'Add Page' : 'Save Changes')}
              </button>
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {pages.length === 0 ? (
              <div>No pages found. (You can add pages below!)</div>
            ) : (
              <ul className="divide-y">
                {pages.map((page: any) => (
                  <li key={page.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{page.title}</span>
                      <span className="ml-2 text-gray-500 text-sm">/{page.slug}</span>
                      {page.is_published ? (
                        <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Published</span>
                      ) : (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Draft</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm" onClick={() => handleEdit(page)}>
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm" onClick={() => handleDelete(page.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAdd}>
                Add Page
              </button>
            </div>
          </>
        )}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
              <h3 className="font-bold mb-4">Delete Page?</h3>
              <p className="mb-6">Are you sure you want to delete this page? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end">
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={cancelDelete} disabled={deleting}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 