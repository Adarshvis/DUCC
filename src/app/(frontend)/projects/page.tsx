import React from 'react'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import PageBanner from '../components/PageBanner'
import ProjectsList from './ProjectsList'

async function getAllProjects() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects' as any,
    sort: 'sortOrder',
    limit: 100,
  })
  return docs
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="cms-page-shell">
      <PageBanner
        title="IT Projects powering Delhi University's digital transformation"
        eyebrow="PROJECTS"
        description="From campus-wide Wi-Fi to cloud migration — tracking the initiatives that modernise DU's technology ecosystem."
      />
      <ProjectsList projects={projects as any[]} />
    </div>
  )
}
