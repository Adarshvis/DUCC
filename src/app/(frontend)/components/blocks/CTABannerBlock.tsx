'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTABannerBlockProps {
  heading: string
  description: string
  primaryButton: {
    label: string
    link: string
  }
  secondaryButton?: {
    label?: string
    link?: string
    external?: boolean
  }
  backgroundColor?: 'white' | 'lightPurple'
}

export default function CTABannerBlock({
  heading,
  description,
  primaryButton,
  secondaryButton,
  backgroundColor = 'lightPurple',
}: CTABannerBlockProps) {
  const bgColor = backgroundColor === 'lightPurple' ? '#F8F4FF' : '#FFFFFF'

  return (
    <section className="py-20 px-6" style={{ background: bgColor }}>
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #4B2E83 0%, #1A103D 100%)' }}>
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
        <div className="relative p-10 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{heading}</h3>
            <p className="mt-4 text-white/70 text-lg">{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              href={primaryButton.link}
              className="btn-shine inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-4 rounded-md transition hover:brightness-110"
              style={{ background: '#EAB308', color: '#1A103D' }}
            >
              {primaryButton.label} <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryButton?.label && secondaryButton?.link && (
              <>
                {secondaryButton.external ? (
                  <a
                    href={secondaryButton.link}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-4 rounded-md text-white border border-white/30 hover:bg-white/10 transition"
                  >
                    {secondaryButton.label}
                  </a>
                ) : (
                  <Link
                    href={secondaryButton.link}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-4 rounded-md text-white border border-white/30 hover:bg-white/10 transition"
                  >
                    {secondaryButton.label}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
