import type { Block } from 'payload'

export const QuickAccessBlock: Block = {
  slug: 'quickAccess',
  labels: {
    singular: 'Quick Access',
    plural: 'Quick Access Blocks',
  },
  interfaceName: 'QuickAccessBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Quick Access Items',
      minRows: 4,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Layout Dashboard', value: 'LayoutDashboard' },
            { label: 'Mail', value: 'Mail' },
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Shield Check', value: 'ShieldCheck' },
            { label: 'Life Buoy', value: 'LifeBuoy' },
            { label: 'Users', value: 'Users' },
            { label: 'Book Open', value: 'BookOpen' },
            { label: 'Server', value: 'Server' },
            { label: 'Lock', value: 'Lock' },
          ],
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'Internal path (e.g., /it-services) or external URL',
          },
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
          label: 'External Link',
        },
        {
          name: 'colorIndex',
          type: 'select',
          label: 'Icon Background Color',
          options: [
            { label: 'Purple 1 (#4B2E83)', value: '0' },
            { label: 'Purple 2 (#1A103D)', value: '1' },
          ],
          defaultValue: '0',
        },
      ],
    },
    {
      name: 'marginTop',
      type: 'number',
      label: 'Negative Margin Top (px)',
      defaultValue: -80,
      admin: {
        description: 'Negative value to overlap with hero section above. Default: -80',
      },
    },
  ],
}
