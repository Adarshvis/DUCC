'use client'

import React from 'react'
import { Quote } from 'lucide-react'

interface DirectorQuoteBlockProps {
  quote: string
  name: string
  role: string
  initials: string
}

export default function DirectorQuoteBlock({ quote, name, role, initials }: DirectorQuoteBlockProps) {
  if (!quote) return null

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#1A103D' }}>
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: '#EAB308' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: '#4B2E83' }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <Quote className="w-12 h-12 mx-auto mb-6" style={{ color: '#EAB308' }} />
        <p className="text-2xl md:text-3xl text-white leading-[1.45] font-medium">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-10 inline-flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
            style={{ background: '#EAB308', color: '#1A103D' }}
          >
            {initials}
          </div>
          <div className="text-left">
            <div className="text-white font-semibold">{name}</div>
            <div className="text-white/60 text-sm">{role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
