import type { Metadata } from 'next'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../components/PageBanner'
import NewsListing from './NewsListing'

async function getNewsList() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'news',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })
  return docs
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'News & Updates', description: 'Latest news and updates from DUCC' }
}

export default async function NewsListingPage() {
  const newsList = await getNewsList()

  return (
    <div className="cms-page-shell">
      <PageBanner title="News & Updates" eyebrow="LATEST NEWS" description="Stay updated with the latest news, events, and announcements from DUCC." />
      <NewsListing articles={newsList as any[]} />
    </div>
  )
}
