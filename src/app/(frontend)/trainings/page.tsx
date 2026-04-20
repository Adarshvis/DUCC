import React from 'react'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../components/PageBanner'
import TrainingsList from './TrainingsList'

async function getAllTrainings() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'trainings' as any,
    where: {
      status: { not_equals: 'completed' },
    },
    sort: 'sortOrder',
    limit: 100,
  })
  return docs
}

export default async function TrainingsPage() {
  const trainings = await getAllTrainings()

  return (
    <div className="cms-page-shell">
      <PageBanner
        title="Training programmes for staff, faculty and researchers"
        eyebrow="TRAININGS"
        description="Faculty Development Programmes, workshops, and hands-on sessions on emerging technologies — building digital capacity across DU."
      />
      <TrainingsList trainings={trainings as any[]} />
    </div>
  )
}
