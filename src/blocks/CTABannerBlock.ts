import type { Block } from 'payload'

export const CTABannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  interfaceName: 'CTABannerBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Problem with Samarth, Wi-Fi, Training, Web hosting or Security?',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Our central IT Service Desk provides front-line user support for all staff and students.',
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Get IT Help',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          defaultValue: '/help-and-support',
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button (Optional)',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Email Helpdesk',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: 'mailto:helpdesk@ducc.du.ac.in',
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: true,
          label: 'External Link',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Section Background Color',
      defaultValue: 'lightPurple',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Purple (#F8F4FF)', value: 'lightPurple' },
      ],
    },
  ],
}
