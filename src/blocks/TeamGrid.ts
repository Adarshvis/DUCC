import type { Block } from 'payload'
import { sectionHeadingFields } from './shared'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  labels: { singular: 'Team / Faculty Grid', plural: 'Team / Faculty Grids' },
  fields: [
    ...sectionHeadingFields,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
        { label: '5 Columns', value: '5' },
        { label: '6 Columns', value: '6' },
      ],
    },
    {
      name: 'showStats',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Stats (rating, student count)',
    },
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Social Links on Cards',
    },
    {
      name: 'members',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Photo',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            description: 'URL slug for profile page. Auto-generated from name if empty.',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) => {
                if (!value && data?.name) {
                  return data.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '')
                }
                return value
              },
            ],
          },
        },
        {
          name: 'role',
          type: 'text',
          label: 'Specialty / Designation',
          admin: {
            description: 'e.g. "Professor", "Research Scholar", "HOD Science"',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Short Description',
        },
        {
          name: 'rating',
          type: 'number',
          min: 0,
          max: 5,
          admin: {
            description: 'Rating out of 5 (e.g. 4.8)',
            step: 0.1,
          },
        },
        {
          name: 'courseCount',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Number of courses',
          },
        },
        {
          name: 'studentCount',
          type: 'text',
          admin: {
            description: 'Student count (e.g. "2.1k" or "2100")',
          },
        },
        {
          name: 'profileLink',
          type: 'text',
          admin: {
            description: 'External profile URL. Leave empty to auto-link to /instructors/{slug}',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          maxRows: 6,
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter / X', value: 'twitter-x' },
                { label: 'GitHub', value: 'github' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Google Scholar', value: 'google' },
                { label: 'Website', value: 'globe' },
                { label: 'Email', value: 'envelope' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
