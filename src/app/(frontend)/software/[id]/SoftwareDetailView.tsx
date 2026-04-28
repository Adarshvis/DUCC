'use client'

import React from 'react'
import Link from 'next/link'
import {
  ExternalLink,
  Calendar,
  Users,
  FileText,
  Key,
  Shield,
  Clock,
  Building2,
  Globe,
} from 'lucide-react'
import DynamicIcon from '../../components/ui/DynamicIcon'

interface SoftwareData {
  id: string
  name: string
  category: string
  description: string
  icon?: string | null
  users?: string | null
  submissions?: string | null
  licenses?: string | null
  validityStart?: string | null
  validityYears?: string | null
  issuedTo?: string | null
  remainingLicenses?: string | null
  licenseType?: string | null
  websiteUrl?: string | null
  requestAccessUrl?: string | null
  status?: string | null
  featured?: boolean | null
}

const licenseTypeLabels: Record<string, string> = {
  network: 'Network License',
  networkKey: 'Network License with Key',
  userKey: 'User / Key Based',
  campus: 'Campus Agreement',
  other: 'Other',
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: '#dcfce7', text: '#166534', label: 'Active' },
  expired: { bg: '#fee2e2', text: '#991b1b', label: 'Expired' },
  comingSoon: { bg: '#fef9c3', text: '#854d0e', label: 'Coming Soon' },
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function SoftwareDetailView({ software }: { software: SoftwareData }) {
  const s = software
  const statusInfo = statusStyles[s.status || 'active'] || statusStyles.active

  return (
    <div className="space-y-8">
      {/* ── Header Card ── */}
      <div
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
      >
        <div
          className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{
            background: `linear-gradient(135deg, var(--cms-primary, #4B2E83) 0%, var(--cms-secondary, #1A103D) 100%)`,
          }}
        >
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <DynamicIcon
              name={s.icon || 'Box'}
              size={32}
              color="var(--cms-accent, #EAB308)"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white">{s.name}</h1>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {s.category}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                style={{ background: statusInfo.bg, color: statusInfo.text }}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {s.websiteUrl && (
              <a
                href={s.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              >
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            <Link
              href={
                s.requestAccessUrl ||
                `/request?software=${encodeURIComponent(s.name)}`
              }
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-lg text-white transition hover:brightness-110"
              style={{ background: 'var(--cms-accent, #EAB308)', color: 'var(--cms-secondary, #1A103D)' }}
            >
              <ExternalLink className="w-4 h-4" /> Request Access
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="px-8 py-6">
          <p className="text-base text-gray-700 leading-relaxed">{s.description}</p>
        </div>
      </div>

      {/* ── Details Grid ── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DetailCard
          icon={<Key className="w-5 h-5" />}
          label="Licenses"
          value={s.licenses}
        />
        <DetailCard
          icon={<Shield className="w-5 h-5" />}
          label="Remaining Licenses"
          value={s.remainingLicenses}
        />
        <DetailCard
          icon={<FileText className="w-5 h-5" />}
          label="License Type"
          value={s.licenseType ? licenseTypeLabels[s.licenseType] || s.licenseType : null}
        />
        <DetailCard
          icon={<Clock className="w-5 h-5" />}
          label="Validity"
          value={
            s.validityYears
              ? `${s.validityYears} year${s.validityYears === '1' ? '' : 's'}`
              : null
          }
        />
        <DetailCard
          icon={<Calendar className="w-5 h-5" />}
          label="Valid From"
          value={formatDate(s.validityStart)}
        />
        <DetailCard
          icon={<Users className="w-5 h-5" />}
          label="Users"
          value={s.users}
        />
        {s.submissions && (
          <DetailCard
            icon={<FileText className="w-5 h-5" />}
            label="Submissions"
            value={s.submissions}
          />
        )}
      </div>

      {/* ── Issued To ── */}
      {s.issuedTo && (
        <div
          className="bg-white rounded-2xl border p-6"
          style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Building2
              className="w-5 h-5"
              style={{ color: 'var(--cms-primary, #4B2E83)' }}
            />
            <h3
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--cms-secondary, #1A103D)' }}
            >
              Issued To
            </h3>
          </div>
          {s.issuedTo.includes(',') ? (
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
              {s.issuedTo.split(',').map((dept, i) => (
                <li key={i}>{dept.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {s.issuedTo}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string | null
}) {
  return (
    <div
      className="bg-white rounded-xl border p-5 flex items-start gap-4"
      style={{ borderColor: 'var(--cms-muted-bg, #F8F4FF)' }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: 'var(--cms-muted-bg, #F8F4FF)',
          color: 'var(--cms-primary, #4B2E83)',
        }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          {label}
        </div>
        <div
          className="text-lg font-bold mt-0.5"
          style={{ color: 'var(--cms-secondary, #1A103D)' }}
        >
          {value || '—'}
        </div>
      </div>
    </div>
  )
}
