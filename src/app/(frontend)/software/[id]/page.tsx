import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../../components/PageBanner'
import BlockRenderer from '../../components/BlockRenderer'
import SoftwareDetailView from './SoftwareDetailView'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getSoftwareById(id: string) {
  const payload = await getPayload({ config })
  try {
    const doc = await payload.findByID({
      collection: 'software' as any,
      id,
      depth: 2,
    })
    return doc || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const software = await getSoftwareById(id)
  if (!software) return {}

  return {
    title: `${software.name} — Software`,
    description: software.description || undefined,
  }
}

export default async function SoftwareDetailPage({ params }: PageProps) {
  const { id } = await params
  const software = await getSoftwareById(id)

  if (!software) notFound()

  const hasBlocks = Array.isArray(software.layout) && software.layout.length > 0

  return (
    <div className="cms-page-shell">
      <PageBanner title={software.name} eyebrow={software.category} />

      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/software"
            className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors hover:opacity-80"
            style={{ color: 'var(--cms-primary, #4B2E83)' }}
          >
            ← Back to Software
          </Link>

          <SoftwareDetailView software={software as any} />

          {/* CMS Layout Blocks */}
          {hasBlocks && (
            <div className="mt-12">
              <BlockRenderer blocks={software.layout as any[]} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
