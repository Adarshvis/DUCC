import React from 'react'
import PageBanner from '../components/PageBanner'
import RequestAccessForm from './RequestAccessForm'

export default function RequestAccessPage() {
  return (
    <div className="cms-page-shell">
      <PageBanner
        title="Request Software Access"
        eyebrow="SOFTWARE SERVICES"
        description="Fill in the form below to request access to university-licensed software."
      />
      <RequestAccessForm />
    </div>
  )
}
