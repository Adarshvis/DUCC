'use client'

import React, { useState } from 'react'
import { ArrowRight, Filter } from 'lucide-react'

interface ProjectItem {
  id: string
  title: string
  description: string
  status: string
  progress: number
  modules?: { name: string; id?: string }[]
  link?: string | null
}

const statusColors: Record<string, { bg: string; text: string }> = {
  ongoing: { bg: 'color-mix(in srgb, var(--cms-accent, #EAB308) 15%, transparent)', text: 'var(--cms-secondary, #1A103D)' },
  active: { bg: 'color-mix(in srgb, #22c55e 15%, transparent)', text: '#166534' },
  live: { bg: 'color-mix(in srgb, #22c55e 15%, transparent)', text: '#166534' },
  completed: { bg: 'color-mix(in srgb, var(--cms-primary, #4B2E83) 15%, transparent)', text: 'var(--cms-primary, #4B2E83)' },
  planned: { bg: 'color-mix(in srgb, #3b82f6 15%, transparent)', text: '#1e40af' },
}

export default function ProjectsList({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState('All')
  const statuses = ['All', ...Array.from(new Set(projects.map((p) => p.status)))]

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.status === filter)

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <Filter className="w-4 h-4 text-gray-500 mr-1" />
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="text-xs font-semibold px-4 py-2 rounded-full transition border capitalize"
              style={
                filter === s
                  ? { background: 'var(--cms-primary, #4B2E83)', borderColor: 'var(--cms-primary, #4B2E83)', color: '#fff' }
                  : { background: '#fff', borderColor: 'var(--cms-muted-bg, #F8F4FF)', color: 'var(--cms-text, #1A103D)' }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const colors = statusColors[project.status] || statusColors.ongoing
            return (
              <div
                key={project.id}
                className="card-hover bg-white rounded-2xl p-8 border"
                style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-xl font-bold ducc-heading"
                    style={{ color: 'var(--cms-secondary, #1A103D)' }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shrink-0"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{project.description}</p>

                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                      Progress
                    </span>
                    <span className="font-bold" style={{ color: 'var(--cms-secondary, #1A103D)' }}>
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ background: 'var(--cms-muted-bg, #F8F4FF)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${project.progress}%`,
                        background: `linear-gradient(90deg, var(--cms-primary, #4B2E83), var(--cms-secondary, #1A103D))`,
                      }}
                    />
                  </div>
                </div>

                {/* Modules */}
                {project.modules && project.modules.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.modules.map((m, i) => (
                      <span
                        key={m.id || i}
                        className="text-xs px-3 py-1.5 rounded-full border"
                        style={{
                          background: 'var(--cms-muted-bg, #F8F4FF)',
                          borderColor: 'color-mix(in srgb, var(--cms-primary, #4B2E83) 15%, transparent)',
                          color: 'var(--cms-text, #1A103D)',
                        }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                    style={{ color: 'var(--cms-primary, #4B2E83)' }}
                  >
                    View details <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">No projects found.</div>
        )}
      </div>
    </section>
  )
}
