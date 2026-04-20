import React from 'react'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../components/PageBanner'
import SoftwareGrid from './SoftwareGrid'

async function getAllSoftware() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'software' as any,
    where: {
      status: { equals: 'active' },
    },
    sort: 'sortOrder',
    limit: 200,
  })
  return docs
}

export default async function SoftwarePage() {
  const software = await getAllSoftware()

  // Extract unique categories for filter buttons
  const categories = Array.from(
    new Set((software as any[]).map((s: any) => s.category).filter(Boolean))
  ).sort()

  return (
    <div className="cms-page-shell">
      <PageBanner
        title="University-licensed software for faculty, researchers and students"
        eyebrow="SOFTWARE SERVICES"
        description="Access enterprise-grade software tools for research, productivity, plagiarism detection and statistical analysis — licensed for DU stakeholders."
      />
      <SoftwareGrid software={software as any[]} categories={categories} />
    </div>
  )
}
