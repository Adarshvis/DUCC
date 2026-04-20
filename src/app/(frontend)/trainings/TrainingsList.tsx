'use client'

import React, { useState } from 'react'
import { ArrowRight, Clock, Users, Calendar, Filter } from 'lucide-react'

interface TrainingItem {
  id: string
  title: string
  duration: string
  mode: string
  audience: string
  level: string
  nextBatch?: string | null
  topics?: { name: string; id?: string }[]
  registerUrl?: string | null
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

export default function TrainingsList({ trainings }: { trainings: TrainingItem[] }) {
  const [filter, setFilter] = useState('All')
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filtered = filter === 'All' ? trainings : trainings.filter((t) => t.level === filter)

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className="text-xs font-semibold px-4 py-2 rounded-full transition border"
              style={
                filter === l
                  ? { background: 'var(--cms-primary, #4B2E83)', borderColor: 'var(--cms-primary, #4B2E83)', color: '#fff' }
                  : { background: '#fff', borderColor: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-text, #1A103D)' }
              }
            >
              {l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((training) => {
            const colors = levelColors[training.level] || levelColors.Intermediate
            return (
              <div
                key={training.id}
                className="card-hover bg-white rounded-2xl border overflow-hidden flex flex-col"
                style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
              >
                <div className="p-6 flex-1">
                  {/* Level badge + date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {training.level}
                    </span>
                    {training.nextBatch && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(training.nextBatch)}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold leading-tight ducc-heading mb-4"
                    style={{ color: 'var(--cms-secondary, #1A103D)' }}
                  >
                    {training.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {training.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {training.audience}
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
                    >
                      {training.mode}
                    </span>
                  </div>

                  {/* Topics */}
                  {training.topics && training.topics.length > 0 && (
                    <div className="mb-4">
                      <div
                        className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                        style={{ color: 'var(--cms-primary, #4B2E83)' }}
                      >
                        Topics
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {training.topics.map((t, i) => (
                          <span
                            key={t.id || i}
                            className="text-xs px-3 py-1.5 rounded-full"
                            style={{
                              background: 'var(--cms-muted-bg, #F8F4FF)',
                              color: 'var(--cms-text, #1A103D)',
                            }}
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Register button */}
                <div className="px-6 pb-6">
                  <a
                    href={training.registerUrl || '#'}
                    className="btn-shine w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white py-3.5 rounded-lg transition hover:brightness-110"
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
          <div className="text-center py-20 text-gray-500">No trainings found.</div>
        )}
      </div>
    </section>
  )
}
