import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import { adminAccess } from '../access/roles'

const autoDeleteWhenMarkedDeleted: CollectionAfterChangeHook = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  if (operation !== 'update') return
  if (doc?.status !== 'deleted') return
  if (previousDoc?.status === 'deleted') return

  try {
    const resumeValue = doc?.resume as unknown
    let resumeId: number | string | null = null

    if (typeof resumeValue === 'number' || typeof resumeValue === 'string') {
      resumeId = resumeValue
    } else if (
      resumeValue &&
      typeof resumeValue === 'object' &&
      'id' in (resumeValue as Record<string, unknown>)
    ) {
      const maybeId = (resumeValue as { id?: number | string }).id
      if (typeof maybeId === 'number' || typeof maybeId === 'string') {
        resumeId = maybeId
      }
    }

    // Delete linked resume first so there is no orphan file on disk.
    if (resumeId !== null) {
      await req.payload.delete({
        collection: 'resumes',
        id: resumeId,
        overrideAccess: true,
      })
    }

    await req.payload.delete({
      collection: 'job-applications',
      id: doc.id,
      overrideAccess: true,
    })
  } catch (err) {
    req.payload.logger.error(`Failed auto-delete for job application ${String(doc?.id)}: ${String(err)}`)
  }
}

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: {
    singular: 'Software Request',
    plural: 'Software Requests',
  },
  admin: {
    useAsTitle: 'applicantName',
    group: 'Software Requests',
    defaultColumns: ['applicantName', 'email', 'jobTitle', 'status', 'createdAt'],
    description: 'Software access requests from users',
    hidden: true,
  },
  access: {
    // Anyone can submit an application
    create: () => true,
    // Only admins can view, update, delete
    read: adminAccess,
    update: adminAccess,
    delete: adminAccess,
  },
  hooks: {
    afterChange: [autoDeleteWhenMarkedDeleted],
  },
  fields: [
    {
      name: 'applicantName',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Mobile',
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Software Requested',
      required: true,
      admin: {
        description: 'The software the user is requesting access to',
      },
    },
    {
      name: 'currentAddress',
      type: 'text',
      label: 'Department / College',
      admin: {
        description: 'Department or college of the requester',
      },
    },
    {
      name: 'permanentAddress',
      type: 'text',
      label: 'Designation',
      admin: {
        description: 'e.g. Professor, Research Scholar, Lab Assistant',
      },
    },
    {
      name: 'highestQualification',
      type: 'text',
      label: 'Purpose',
      admin: {
        description: 'Why they need access to this software',
      },
    },
    {
      name: 'workStatus',
      type: 'select',
      label: 'I am',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'PhD Scholar', value: 'phd_scholar' },
        { label: 'Faculty Members', value: 'faculty' },
        { label: 'Non Teaching Staff', value: 'admin_staff' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'yearOfExperience',
      type: 'text',
      label: 'Additional Notes',
      admin: {
        description: 'Any additional information',
      },
    },
    {
      name: 'resume',
      type: 'relationship',
      label: 'Attachment',
      relationTo: 'resumes',
      admin: {
        description: 'Optional document upload',
        condition: () => false,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Request Status',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Approved', value: 'shortlisted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Delete', value: 'deleted' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
