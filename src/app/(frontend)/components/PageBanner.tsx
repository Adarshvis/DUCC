import React from 'react'
import Link from 'next/link'

interface PageBannerProps {
  title: string
  slug?: string
  eyebrow?: string
  description?: string
  userSlot?: React.ReactNode
}

export default function PageBanner({ title, slug, eyebrow, description, userSlot }: PageBannerProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)`,
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />

      {/* Decorative blurs */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ background: 'var(--cms-accent, #EAB308)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: 'var(--cms-primary, #4B2E83)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            {eyebrow ? (
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6"
                style={{
                  background: `color-mix(in srgb, var(--cms-accent, #EAB308) 15%, transparent)`,
                  color: 'var(--cms-accent, #EAB308)',
                  border: `1px solid color-mix(in srgb, var(--cms-accent, #EAB308) 30%, transparent)`,
                }}
              >
                {eyebrow}
              </span>
            ) : slug ? (
              <nav className="mb-4 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-white/90">{title}</span>
              </nav>
            ) : null}

            {/* Title */}
            <h1
              className="ducc-heading text-white font-bold tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)' }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mt-6 text-white/80 text-lg leading-relaxed">{description}</p>
            )}
          </div>

          {/* User slot (for dashboard) */}
          {userSlot && <div className="shrink-0 text-white">{userSlot}</div>}
        </div>
      </div>

      {/* Wave bottom curve */}
      <svg
        className="block w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: 60 }}
      >
        <path d="M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z" fill="var(--cms-bg, #ffffff)" />
      </svg>
    </section>
  )
}
