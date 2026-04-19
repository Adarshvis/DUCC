'use client'

import React from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

interface QuickAccessItem {
  label: string
  icon: string
  link: string
  external?: boolean
  colorIndex?: string
  id?: string
}

interface QuickAccessBlockProps {
  items: QuickAccessItem[]
  marginTop?: number
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Circle
  return <IconComponent className={className} />
}

export default function QuickAccessBlock({ items, marginTop = -80 }: QuickAccessBlockProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="relative z-20 px-6" style={{ marginTop: `${marginTop}px` }}>
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: '#ffffff', border: '1px solid #F8F4FF' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {items.map((item, i) => {
              const Component = item.external ? 'a' : Link
              const props = item.external
                ? { href: item.link, target: '_blank', rel: 'noreferrer' }
                : { href: item.link }

              return (
                <Component
                  key={item.id || i}
                  {...(props as any)}
                  className="group relative flex flex-col items-center justify-center gap-3 py-8 px-4 text-center transition-all hover:bg-[#F8F4FF] border-r border-b last:border-r-0 md:[&:nth-child(3)]:border-r-0 lg:[&:nth-child(3)]:border-r lg:[&:nth-child(6)]:border-r-0"
                  style={{ borderColor: '#F8F4FF' }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: item.colorIndex === '1' ? '#1A103D' : '#4B2E83',
                    }}
                  >
                    <Icon name={item.icon} className="w-6 h-6 text-[#EAB308]" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-[#4B2E83] transition-colors">
                    {item.label}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#EAB308] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Component>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
