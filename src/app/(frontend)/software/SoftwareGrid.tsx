'use client'

import React, { useState } from 'react'
import { Search, Filter, ExternalLink, LayoutGrid, Table2, ArrowUpDown, Eye } from 'lucide-react'
import DynamicIcon from '../components/ui/DynamicIcon'

interface SoftwareItem {
  id: string
  name: string
  category: string
  description: string
  icon?: string | null
  users?: string | null
  submissions?: string | null
  licenses?: string | null
  validityYears?: string | null
  issuedTo?: string | null
  remainingLicenses?: string | null
  licenseType?: string | null
  requestAccessUrl?: string | null
}

interface SoftwareGridProps {
  software: SoftwareItem[]
  categories: string[]
}

type SortKey = 'name' | 'licenses' | 'validityYears' | 'remainingLicenses'
type SortDir = 'asc' | 'desc'

export default function SoftwareGrid({ software, categories }: SoftwareGridProps) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')
  const [view, setView] = useState<'grid' | 'table'>('table')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const filtered = software.filter((s) => {
    const matchesCat = activeCat === 'All' || s.category === activeCat
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  const sorted = [...filtered].sort((a, b) => {
    const aVal = (a[sortKey] || '').toLowerCase()
    const bVal = (b[sortKey] || '').toLowerCase()
    return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search + Filter + View Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search software by name or description..."
              className="w-full pl-11 h-12 bg-white border rounded-lg text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500 mr-1" />
            <button
              onClick={() => setActiveCat('All')}
              className="text-xs font-semibold px-4 py-2 rounded-full transition border"
              style={
                activeCat === 'All'
                  ? { background: 'var(--cms-primary, #4B2E83)', borderColor: 'var(--cms-primary, #4B2E83)', color: '#fff' }
                  : { background: '#fff', borderColor: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-text, #1A103D)' }
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
                    ? { background: 'var(--cms-primary, #4B2E83)', borderColor: 'var(--cms-primary, #4B2E83)', color: '#fff' }
                    : { background: '#fff', borderColor: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-text, #1A103D)' }
                }
              >
                {cat}
              </button>
            ))}

            {/* View toggle */}
            <div className="ml-auto flex gap-1 border rounded-lg p-1" style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}>
              <button
                onClick={() => setView('table')}
                className="p-2 rounded-md transition"
                style={{
                  background: view === 'table' ? 'var(--cms-primary, #4B2E83)' : 'transparent',
                  color: view === 'table' ? '#fff' : 'var(--cms-text, #1A103D)',
                }}
                title="Table View"
              >
                <Table2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('grid')}
                className="p-2 rounded-md transition"
                style={{
                  background: view === 'grid' ? 'var(--cms-primary, #4B2E83)' : 'transparent',
                  color: view === 'grid' ? '#fff' : 'var(--cms-text, #1A103D)',
                }}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {sorted.length} of {software.length} software
        </div>

        {/* ── TABLE VIEW ── */}
        {view === 'table' && (
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'var(--cms-secondary, #1A103D)' }}>
                    {[
                      { key: 'name' as SortKey, label: 'Software' },
                      { key: 'licenses' as SortKey, label: 'Licenses' },
                      { key: 'validityYears' as SortKey, label: 'Validity' },
                      { key: null, label: 'Issued To' },
                      { key: 'remainingLicenses' as SortKey, label: 'Remaining' },
                      { key: null, label: 'Actions' },
                    ].map((col, i) => (
                      <th
                        key={i}
                        className={`px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider ${col.key ? 'cursor-pointer hover:text-[--cms-accent] select-none' : ''}`}
                        onClick={() => col.key && toggleSort(col.key)}
                      >
                        <span className="inline-flex items-center gap-1">
                          {col.label}
                          {col.key && <ArrowUpDown className="w-3 h-3 opacity-50" />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s, idx) => (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-[--cms-muted-bg]"
                      style={{ borderBottom: idx < sorted.length - 1 ? '1px solid var(--cms-muted-bg, #F8F4FF)' : 'none' }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)` }}
                          >
                            <DynamicIcon name={s.icon || 'Box'} size={16} color="var(--cms-accent, #EAB308)" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: 'var(--cms-secondary, #1A103D)' }}>{s.name}</div>
                            <div className="text-[10px] text-gray-400">{s.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.licenses || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.validityYears ? `${s.validityYears} yr${s.validityYears === '1' ? '' : 's'}` : '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate" title={s.issuedTo || ''}>{s.issuedTo || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.remainingLicenses || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/software/${s.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-md border transition hover:shadow-sm"
                            style={{ borderColor: 'var(--cms-primary, #4B2E83)', color: 'var(--cms-primary, #4B2E83)' }}
                          >
                            <Eye className="w-3 h-3" /> Detail
                          </a>
                          <a
                            href={`/request?software=${encodeURIComponent(s.name)}`}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-md text-white transition hover:brightness-110"
                            style={{ background: 'var(--cms-primary, #4B2E83)' }}
                          >
                            <ExternalLink className="w-3 h-3" /> Request
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sorted.length === 0 && (
              <div className="text-center py-16 text-gray-500">No software found matching your search.</div>
            )}
          </div>
        )}

        {/* ── GRID VIEW ── */}
        {view === 'grid' && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((s) => (
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
                        style={{ background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)` }}
                      >
                        <DynamicIcon name={s.icon || 'Box'} size={24} color="var(--cms-accent, #EAB308)" />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                        style={{ background: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-primary, #4B2E83)', borderColor: 'color-mix(in srgb, var(--cms-primary, #4B2E83) 20%, transparent)' }}
                      >
                        {s.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--cms-secondary, #1A103D)' }}>{s.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
                    <div
                      className="mt-5 pt-5 border-t flex items-center justify-between text-xs"
                      style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                    >
                      <div className="space-y-0.5">
                        {s.users && (
                          <div className="text-gray-500">Users: <span className="font-semibold" style={{ color: 'var(--cms-text, #1A103D)' }}>{s.users}</span></div>
                        )}
                        {s.submissions && (
                          <div className="text-gray-500">Submissions: <span className="font-semibold" style={{ color: 'var(--cms-text, #1A103D)' }}>{s.submissions}</span></div>
                        )}
                      </div>
                      <a
                        href={`/request?software=${encodeURIComponent(s.name)}`}
                        className="inline-flex items-center gap-1.5 font-semibold group-hover:gap-2 transition-all"
                        style={{ color: 'var(--cms-primary, #4B2E83)' }}
                      >
                        Request Access <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {sorted.length === 0 && (
              <div className="text-center py-20 text-gray-500">No software found matching your search.</div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
