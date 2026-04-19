import type { Block } from 'payload'

export const DirectorQuoteBlock: Block = {
  slug: 'directorQuote',
  labels: {
    singular: 'Director Quote',
    plural: 'Director Quotes',
  },
  interfaceName: 'DirectorQuoteBlock',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The quote text from the director or leadership',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Prof. Sanjeev Singh',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      defaultValue: 'Director, DUCC',
    },
    {
      name: 'initials',
      type: 'text',
      required: true,
      maxLength: 2,
      defaultValue: 'SS',
      admin: {
        description: '2-letter initials for avatar (e.g., "SS")',
      },
    },
  ],
}
