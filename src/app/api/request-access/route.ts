import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Valid values for the workStatus select field
const VALID_WORK_STATUS = ['student', 'phd_scholar', 'faculty', 'admin_staff', 'researcher', 'other']

// Map display labels to values
const ROLE_LABEL_MAP: Record<string, string> = {
  'student': 'student',
  'phd scholar': 'phd_scholar',
  'phd_scholar': 'phd_scholar',
  'faculty': 'faculty',
  'faculty members': 'faculty',
  'non teaching staff': 'admin_staff',
  'non-teaching staff': 'admin_staff',
  'administrative staff': 'admin_staff',
  'admin staff': 'admin_staff',
  'admin_staff': 'admin_staff',
  'researcher': 'researcher',
  'other': 'other',
}

function normalizeRole(value: string): string | undefined {
  if (!value) return undefined
  const lower = value.toLowerCase().trim()
  if (VALID_WORK_STATUS.includes(lower)) return lower
  return ROLE_LABEL_MAP[lower] || undefined
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { fullName, email, mobile, role, software, ...extraFields } = body

    if (!software) {
      return NextResponse.json(
        { error: 'Software name is required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Build the data object with known fields
    const data: Record<string, unknown> = {
      applicantName: fullName || '',
      email: email || '',
      phone: mobile || '',
      jobTitle: software,
      status: 'new',
    }

    // Only set workStatus if it's a valid option
    const normalizedRole = normalizeRole(role || '')
    if (normalizedRole) {
      data.workStatus = normalizedRole
    }

    // Store any extra form fields in available collection fields
    // This allows admin to add new fields in the form builder
    // and they'll be stored in the matching collection field if it exists
    if (extraFields && typeof extraFields === 'object') {
      const fieldMap: Record<string, string> = {
        department: 'currentAddress',
        college: 'currentAddress',
        designation: 'permanentAddress',
        purpose: 'highestQualification',
        notes: 'yearOfExperience',
        additionalNotes: 'yearOfExperience',
      }

      for (const [key, value] of Object.entries(extraFields)) {
        if (typeof value !== 'string' || !value.trim()) continue
        const mappedField = fieldMap[key]
        if (mappedField && !data[mappedField]) {
          data[mappedField] = value.trim()
        }
      }
    }

    await payload.create({
      collection: 'job-applications',
      data: data as any,
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, message: 'Request submitted successfully.' })
  } catch (err) {
    console.error('Request access error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
