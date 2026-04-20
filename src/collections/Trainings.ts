import type { CollectionConfig } from 'payload'
import { editorAccess, publicAccess, schoolAdminAccess } from '../access/roles'
import { collectionBlocks } from '../blocks/allBlocks'

export const Trainings: CollectionConfig = {
  slug: 'trainings',
  labels: {
    singular: 'Training',
    plural: 'Trainings',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'level', 'mode', 'nextBatch', 'updatedAt'],
    description: 'Training programmes and workshops',
  },
  access: {
    read: publicAccess,
    create: editorAccess,
    update: editorAccess,
    delete: schoolAdminAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "5 Days", "1 Day", "2 Days"',
      },
    },
    {
      name: 'mode',
      type: 'select',
      required: true,
      options: [
        { label: 'In-person', value: 'In-person' },
        { label: 'Online', value: 'Online' },
        { label: 'Hybrid', value: 'Hybrid' },
      ],
    },
    {
      name: 'audience',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Faculty", "Administrative Staff", "Students & Faculty"',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
      ],
    },
    {
      name: 'nextBatch',
      type: 'date',
      label: 'Next Batch Date',
      admin: {
        description: 'When the next batch starts',
      },
    },
    {
      name: 'topics',
      type: 'array',
      label: 'Topics Covered',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'registerUrl',
      type: 'text',
      label: 'Registration URL',
      admin: {
        description: 'Link for the Register button',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: collectionBlocks,
    },
  ],
}
