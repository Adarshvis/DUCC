'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ITRequestForm() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || ''

  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', role: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.fullName) {
      setError('Full name is required.')
      return
    }

    if (!service) {
      setError('Service name is missing. Please go back and click "Request Access" on a service card.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service,
          requestType: 'it-service',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Submission failed.')
        return
      }
      setSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2
            className="w-16 h-16 mx-auto mb-6"
            style={{ color: 'var(--cms-primary, #4B2E83)' }}
          />
          <h2
            className="text-2xl font-bold ducc-heading"
            style={{ color: 'var(--cms-secondary, #1A103D)' }}
          >
            Request Submitted!
          </h2>
          <p className="mt-3 text-gray-600">
            Your request for <strong>{service}</strong> has been submitted.
            You will be notified once it is reviewed.
          </p>
          <Link
            href="/it-services"
            className="btn-shine mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-md"
            style={{ background: 'var(--cms-primary, #4B2E83)' }}
          >
            Back to IT Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-white rounded-2xl p-8 md:p-10 border"
          style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
        >
          {service && (
            <div
              className="mb-6 px-4 py-3 rounded-lg text-sm"
              style={{ background: 'var(--cms-muted-bg, #F8F4FF)' }}
            >
              Requesting access for:{' '}
              <strong style={{ color: 'var(--cms-primary, #4B2E83)' }}>{service}</strong>
            </div>
          )}

          <h2
            className="text-2xl font-bold ducc-heading mb-2"
            style={{ color: 'var(--cms-secondary, #1A103D)' }}
          >
            Request IT Service Access
          </h2>

          {error && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@du.ac.in"
                  className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                  Mobile
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="Your mobile number"
                  className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                  I am
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors bg-white"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
                >
                  <option value="">Select an option</option>
                  <option value="student">Student</option>
                  <option value="phd_scholar">PhD Scholar</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin_staff">Administrative Staff</option>
                  <option value="researcher">Researcher</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-shine inline-flex items-center gap-2 text-sm font-semibold text-white px-8 py-3.5 rounded-lg transition hover:shadow-lg disabled:opacity-60"
                style={{ background: 'var(--cms-primary, #4B2E83)' }}
              >
                {loading ? 'Submitting...' : 'Request Access'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
