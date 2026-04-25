import React from 'react'
import PageBanner from '../components/PageBanner'
import ITRequestForm from './ITRequestForm'

export default function ITRequestPage() {
  return (
    <div className="cms-page-shell">
      <PageBanner
        title="Request IT Service"
        eyebrow="IT SERVICES"
        description="Fill in the form below to request access to university IT services."
      />
      <ITRequestForm />
    </div>
  )
}
