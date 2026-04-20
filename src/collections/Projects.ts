import type { CollectionConfig } from 'payload'
import { editorAccess, publicAccess, schoolAdminAccess } from '../access/roles'
import { collectionBlocks } from '../blocks/allBlocks'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', 'progress', 'updatedAt'],
    description: 'IT projects and initiatives',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ongoing',
      options: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Active', value: 'active' },
        { label: 'Live', value: 'live' },
        { label: 'Completed', value: 'completed' },
        { label: 'Planned', value: 'planned' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'progress',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 0,
      admin: {
        description: 'Progress percentage (0-100)',
        position: 'sidebar',
      },
    },
    {
      name: 'modules',
      type: 'array',
      label: 'Modules / Components',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional link for "View details"',
      },
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
