'use client'

import React, { useState } from 'react'
import { Search, Filter, ExternalLink } from 'lucide-react'
import DynamicIcon from '../components/ui/DynamicIcon'

interface SoftwareItem {
  id: string
  name: string
  category: string
  description: string
  icon?: string | null
  users?: string | null
  submissions?: string | null
  requestAccessUrl?: string | null
}

interface SoftwareGridProps {
  software: SoftwareItem[]
  categories: string[]
}

export default function SoftwareGrid({ software, categories }: SoftwareGridProps) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const filtered = software.filter((s) => {
    const matchesCat = activeCat === 'All' || s.category === activeCat
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search & filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search software by name or description..."
              className="w-full pl-11 h-12 bg-white border rounded-lg text-sm outline-none transition-colors"
              style={{
                borderColor: 'var(--cms-muted-bg, #F8F4FF)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)'
                e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--cms-primary, #4B2E83) 15%, transparent)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            <button
              onClick={() => setActiveCat('All')}
              className="text-xs font-semibold px-4 py-2 rounded-full transition border"
              style={
                activeCat === 'All'
                  ? {
                      background: 'var(--cms-primary, #4B2E83)',
                      borderColor: 'var(--cms-primary, #4B2E83)',
                      color: '#fff',
                    }
                  : {
                      background: '#fff',
                      borderColor: 'var(--cms-muted-bg, #F8F4FF)',
                      color: 'var(--cms-text, #1A103D)',
                    }
              }
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="text-xs font-semibold px-4 py-2 rounded-full transition border"
                style={
                  activeCat === cat
                    ? {
                        background: 'var(--cms-primary, #4B2E83)',
                        borderColor: 'var(--cms-primary, #4B2E83)',
                        color: '#fff',
                      }
                    : {
                        background: '#fff',
                        borderColor: 'var(--cms-muted-bg, #F8F4FF)',
                        color: 'var(--cms-text, #1A103D)',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="card-hover bg-white rounded-2xl p-6 border relative overflow-hidden group"
              style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition"
                style={{ background: 'var(--cms-accent, #EAB308)' }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)`,
                    }}
                  >
                    <DynamicIcon
                      name={s.icon || 'Box'}
                      size={24}
                      color="var(--cms-accent, #EAB308)"
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      background: 'var(--cms-muted-bg, #F8F4FF)',
                      color: 'var(--cms-primary, #4B2E83)',
                      borderColor: 'color-mix(in srgb, var(--cms-primary, #4B2E83) 20%, transparent)',
                    }}
                  >
                    {s.category}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: 'var(--cms-secondary, #1A103D)' }}
                >
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
                <div
                  className="mt-5 pt-5 border-t flex items-center justify-between text-xs"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                >
                  <div className="space-y-0.5">
                    {s.users && (
                      <div className="text-gray-500">
                        Users:{' '}
                        <span className="font-semibold" style={{ color: 'var(--cms-text, #1A103D)' }}>
                          {s.users}
                        </span>
                      </div>
                    )}
                    {s.submissions && (
                      <div className="text-gray-500">
                        Submissions:{' '}
                        <span className="font-semibold" style={{ color: 'var(--cms-text, #1A103D)' }}>
                          {s.submissions}
                        </span>
                      </div>
                    )}
                  </div>
                  {s.requestAccessUrl ? (
                    <a
                      href={s.requestAccessUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold group-hover:gap-2 transition-all"
                      style={{ color: 'var(--cms-primary, #4B2E83)' }}
                    >
                      Request Access <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 font-semibold"
                      style={{ color: 'var(--cms-primary, #4B2E83)' }}
                    >
                      Request Access <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No software found matching your search.
          </div>
        )}
      </div>
    </section>
  )
}
