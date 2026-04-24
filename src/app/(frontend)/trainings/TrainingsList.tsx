'use client'

import React, { useState } from 'react'
import { ArrowRight, Clock, Users as UsersIcon, Calendar, Search } from 'lucide-react'

interface TrainingItem {
  id: string
  title: string
  duration: string
  mode: string
  audience: string
  level: string
  category?: string | null
  nextBatch?: string | null
  topics?: { name: string; id?: string }[]
  registerUrl?: string | null
  image?: { url?: string; alt?: string } | null
}

const levelColors: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: 'color-mix(in srgb, #22c55e 15%, transparent)', text: '#166534' },
  Intermediate: { bg: 'color-mix(in srgb, var(--cms-accent, #EAB308) 15%, transparent)', text: 'var(--cms-secondary, #1A103D)' },
  Advanced: { bg: 'color-mix(in srgb, #ef4444 15%, transparent)', text: '#991b1b' },
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}

function getImageUrl(item: TrainingItem): string | null {
  return typeof item.image === 'object' && item.image?.url ? item.image.url : null
}

export default function TrainingsList({ trainings }: { trainings: TrainingItem[] }) {
  const [query, setQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string[]>([])
  const [selectedMode, setSelectedMode] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  const levels = Array.from(new Set(trainings.map((t) => t.level).filter(Boolean)))
  const modes = Array.from(new Set(trainings.map((t) => t.mode).filter(Boolean)))
  const categories = Array.from(new Set(trainings.map((t) => t.category).filter(Boolean))) as string[]

  const filtered = trainings.filter((t) => {
    if (query && !t.title.toLowerCase().includes(query.toLowerCase())) return false
    if (selectedLevel.length > 0 && !selectedLevel.includes(t.level)) return false
    if (selectedMode.length > 0 && !selectedMode.includes(t.mode)) return false
    if (selectedCategory.length > 0 && !selectedCategory.includes(t.category || '')) return false
    return true
  })

  function toggleFilter(arr: string[], val: string, setter: (v: string[]) => void) {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
  }

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="bg-white rounded-2xl p-6 border sticky top-[120px]" style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}>
            <h3 className="text-base font-bold mb-5" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
              Filter Trainings
            </h3>

            {/* Category */}
            {categories.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cms-primary, #4B2E83)' }}>Category</h4>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 py-1.5 cursor-pointer text-sm text-gray-700 hover:text-[--cms-primary]">
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
                      onChange={() => toggleFilter(selectedCategory, cat, setSelectedCategory)}
                      className="rounded"
                      style={{ accentColor: 'var(--cms-primary, #4B2E83)' }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            )}

            {/* Level */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cms-primary, #4B2E83)' }}>Level</h4>
              {levels.map((level) => (
                <label key={level} className="flex items-center gap-2 py-1.5 cursor-pointer text-sm text-gray-700 hover:text-[--cms-primary]">
                  <input
                    type="checkbox"
                    checked={selectedLevel.includes(level)}
                    onChange={() => toggleFilter(selectedLevel, level, setSelectedLevel)}
                    className="rounded"
                    style={{ accentColor: 'var(--cms-primary, #4B2E83)' }}
                  />
                  {level}
                </label>
              ))}
            </div>

            {/* Mode */}
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--cms-primary, #4B2E83)' }}>Mode</h4>
              {modes.map((mode) => (
                <label key={mode} className="flex items-center gap-2 py-1.5 cursor-pointer text-sm text-gray-700 hover:text-[--cms-primary]">
                  <input
                    type="checkbox"
                    checked={selectedMode.includes(mode)}
                    onChange={() => toggleFilter(selectedMode, mode, setSelectedMode)}
                    className="rounded"
                    style={{ accentColor: 'var(--cms-primary, #4B2E83)' }}
                  />
                  {mode}
                </label>
              ))}
            </div>

            {/* Clear */}
            {(selectedLevel.length > 0 || selectedMode.length > 0 || selectedCategory.length > 0) && (
              <button
                onClick={() => { setSelectedLevel([]); setSelectedMode([]); setSelectedCategory([]) }}
                className="text-xs font-semibold mt-2"
                style={{ color: 'var(--cms-primary, #4B2E83)' }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search trainings..."
              className="w-full pl-11 h-12 bg-white border rounded-lg text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--cms-primary, #4B2E83)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cms-muted-bg, #F8F4FF)' }}
            />
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Showing {filtered.length} of {trainings.length} trainings
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((training) => {
              const colors = levelColors[training.level] || levelColors.Intermediate
              const imgUrl = getImageUrl(training)

              return (
                <div
                  key={training.id}
                  className="card-hover bg-white rounded-2xl border overflow-hidden flex flex-col"
                  style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                >
                  {/* Image */}
                  {imgUrl && (
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                      <img
                        src={imgUrl}
                        alt={training.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {training.level && (
                        <span
                          className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {training.level}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Level badge (if no image) + date */}
                    {!imgUrl && (
                      <div className="flex items-center justify-between mb-3">
                        {training.level && (
                          <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                            {training.level}
                          </span>
                        )}
                        {training.nextBatch && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(training.nextBatch)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Date (when image exists) */}
                    {imgUrl && training.nextBatch && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(training.nextBatch)}
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      className="text-lg font-bold leading-tight ducc-heading mb-3"
                      style={{ color: 'var(--cms-secondary, #1A103D)' }}
                    >
                      {training.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-4 flex-wrap">
                      {training.duration && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {training.duration}</span>}
                      {training.audience && <span className="flex items-center gap-1.5"><UsersIcon className="w-4 h-4" /> {training.audience}</span>}
                      {training.mode && (
                        <span className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}>
                          {training.mode}
                        </span>
                      )}
                    </div>

                    {/* Topics */}
                    {training.topics && training.topics.length > 0 && (
                      <div className="mb-4 flex-1">
                        <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--cms-primary, #4B2E83)' }}>Topics</div>
                        <div className="flex flex-wrap gap-1.5">
                          {training.topics.map((t, i) => (
                            <span key={t.id || i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-text, #1A103D)' }}>
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Register button */}
                    <a
                      href={training.registerUrl || '#'}
                      className="btn-shine mt-auto w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-lg transition hover:brightness-110"
                      style={{ background: 'var(--cms-primary, #4B2E83)' }}
                    >
                      Register <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">No trainings found matching your filters.</div>
          )}
        </div>
      </div>
    </section>
  )
}
