import React from 'react'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import config from '@/payload.config'
import BlockRenderer from './components/BlockRenderer'
import { getHomePage } from '@/lib/getHomePage'

async function getHomePageData() {
  const payload = await getPayload({ config })
  const homePageData = await getHomePage(payload)

  if (!homePageData) {
    // Fallback to 'home' page if not configured
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    })
    return { type: 'page', data: docs[0] || null }
  }

  // If it's a static route, return route info for redirect
  if (homePageData.collection === 'route' && homePageData.route) {
    return { type: 'route', route: homePageData.route }
  }

  // Otherwise return page data
  return { type: 'page', data: homePageData.data }
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getHomePageData()
  
  if (result.type === 'route') {
    return { title: 'SamarthX' }
  }

  const page = result.data
  if (!page) return { title: 'SamarthX' }

  return {
    title: page.meta?.title || page.title || 'SamarthX',
    description: page.meta?.description || undefined,
    openGraph:
      page.meta?.image && typeof page.meta.image === 'object' && page.meta.image.url
        ? { images: [{ url: page.meta.image.url }] }
        : undefined,
  }
}

export default async function HomePage() {
  const result = await getHomePageData()

  // If home page is set to a static route, redirect to it
  if (result.type === 'route' && result.route) {
    redirect(result.route)
  }

  const page = result.data
  if (!page) notFound()

  return (
    <div className="cms-page-shell">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}
