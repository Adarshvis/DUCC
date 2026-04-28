'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Monitor, Server } from 'lucide-react'
import FormBuilderEmbed from '../components/blocks/FormBuilderEmbed'

interface ITRequestFormWrapperProps {
  form: unknown
}

export default function ITRequestFormWrapper({ form }: ITRequestFormWrapperProps) {
  const searchParams = useSearchParams()
  const softwareName = searchParams.get('software') || ''
  const serviceName = searchParams.get('service') || ''
  const itemName = softwareName || serviceName
  const itemType = softwareName ? 'Software' : serviceName ? 'IT Service' : ''

  if (!itemName) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">
          No software or service selected. Please go back and click &quot;Request Access&quot; on a specific item.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/software"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition hover:brightness-110"
            style={{ background: 'var(--cms-primary, #4B2E83)' }}
          >
            <Monitor className="w-4 h-4" /> Browse Software
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Banner showing what's being requested */}
      <div
        className="mb-8 px-5 py-4 rounded-xl flex items-center gap-4"
        style={{ background: 'var(--cms-muted-bg, #F8F4FF)' }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)`,
          }}
        >
          {softwareName ? (
            <Monitor className="w-5 h-5 text-white" />
          ) : (
            <Server className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Requesting {itemType} Access
          </div>
          <div
            className="text-lg font-bold"
            style={{ color: 'var(--cms-primary, #4B2E83)' }}
          >
            {itemName}
          </div>
        </div>
      </div>

      {/* Hidden field — the software/service name gets picked up by FormBuilderEmbed's
          submit handler which reads ?software= and ?service= from the URL */}
      <FormBuilderEmbed form={form} />
    </div>
  )
}
