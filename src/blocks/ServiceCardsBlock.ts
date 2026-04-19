import type { Block } from 'payload'

export const ServiceCardsBlock: Block = {
  slug: 'serviceCards',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Blocks',
  },
  interfaceName: 'ServiceCardsBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      defaultValue: 'WHAT WE DO',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Services for staff, students and academics.',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      defaultValue: 'Explore all services',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
      defaultValue: '/it-services',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Services',
      minRows: 4,
      maxRows: 12,
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
          maxLength: 150,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Layout Dashboard', value: 'LayoutDashboard' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Globe', value: 'Globe' },
            { label: 'File Check', value: 'FileCheck' },
            { label: 'Shopping Cart', value: 'ShoppingCart' },
            { label: 'Headphones', value: 'Headphones' },
            { label: 'Server', value: 'Server' },
            { label: 'Database', value: 'Database' },
            { label: 'Lock', value: 'Lock' },
            { label: 'Cloud', value: 'Cloud' },
          ],
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: {
            description: 'Small tag label (e.g., "Platform", "Security")',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
          label: 'External Link',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Number of Columns',
      defaultValue: '4',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'lightPurple',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Purple (#F8F4FF)', value: 'lightPurple' },
      ],
    },
  ],
}
