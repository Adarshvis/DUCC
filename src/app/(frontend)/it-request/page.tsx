import React from 'react'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../components/PageBanner'
import ITRequestFormWrapper from './ITRequestFormWrapper'

/**
 * Fetches the IT request form from the admin panel.
 * Picks the most recently created form whose title mentions "request" or "access".
 */
async function getITRequestForm() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'forms',
    limit: 50,
    depth: 1,
    sort: '-createdAt',
  })

  if (docs.length === 0) return null

  const match = docs.find((doc: any) => {
    const title = (doc.title || '').toLowerCase()
    return title.includes('request') || title.includes('access') || title.includes('it-service')
  })

  return match || docs[0]
}

export default async function ITRequestPage() {
  const form = await getITRequestForm()

  if (!form) notFound()

  return (
    <div className="cms-page-shell">
      <PageBanner
        title={(form as any).title || 'Request Access'}
        eyebrow="REQUEST ACCESS"
        description="Fill in the form below to request access."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ITRequestFormWrapper form={form} />
        </div>
      </section>
    </div>
  )
}
