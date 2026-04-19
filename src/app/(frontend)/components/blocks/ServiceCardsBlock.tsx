'use client'

import React from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'

interface Service {
  title: string
  description: string
  icon: string
  tag: string
  link: string
  external?: boolean
  id?: string
}

interface ServiceCardsBlockProps {
  eyebrow?: string
  heading: string
  ctaLabel?: string
  ctaLink?: string
  services: Service[]
  columns?: '2' | '3' | '4'
  backgroundColor?: 'white' | 'lightPurple'
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Box
  return <IconComponent className={className} />
}

const columnClasses = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export default function ServiceCardsBlock({
  eyebrow = 'WHAT WE DO',
  heading,
  ctaLabel = 'Explore all services',
  ctaLink = '/it-services',
  services,
  columns = '4',
  backgroundColor = 'lightPurple',
}: ServiceCardsBlockProps) {
  if (!services || services.length === 0) return null

  const bgColor = backgroundColor === 'lightPurple' ? '#F8F4FF' : '#FFFFFF'

  return (
    <section className="py-24 px-6" style={{ background: bgColor }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#4B2E83' }}>
              {eyebrow}
            </span>
            <h2
              className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]"
              style={{ color: '#1A103D' }}
            >
              {heading}
            </h2>
          </div>
          {ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: '#4B2E83' }}
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className={`grid ${columnClasses[columns]} gap-5`}>
          {services.map((service) => {
            const Component = service.external ? 'a' : Link
            const props = service.external
              ? { href: service.link, target: '_blank', rel: 'noreferrer' }
              : { href: service.link }

            return (
              <Component
                key={service.id || service.title}
                {...(props as any)}
                className="card-hover group relative bg-white rounded-2xl p-6 border overflow-hidden"
                style={{ borderColor: '#F8F4FF' }}
                onClick={(e: any) => {
                  if (service.external && service.link.startsWith('http')) {
                    e.preventDefault()
                    window.open(service.link, '_blank')
                  }
                }}
              >
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"
                  style={{ background: '#EAB308' }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform"
                      style={{ background: 'linear-gradient(135deg, #4B2E83 0%, #1A103D 100%)' }}
                    >
                      <Icon name={service.icon} className="w-5 h-5 text-[#EAB308]" />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{ background: '#F8F4FF', color: '#4B2E83' }}
                    >
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight" style={{ color: '#1A103D' }}>
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  <div
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
                    style={{ color: '#4B2E83' }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Component>
            )
          })}
        </div>
      </div>
    </section>
  )
}
