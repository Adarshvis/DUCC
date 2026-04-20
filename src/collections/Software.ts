import type { CollectionConfig } from 'payload'
import { editorAccess, publicAccess, schoolAdminAccess } from '../access/roles'
import { collectionBlocks } from '../blocks/allBlocks'

export const Software: CollectionConfig = {
  slug: 'software',
  labels: {
    singular: 'Software',
    plural: 'Software',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'category', 'users', 'status', 'updatedAt'],
    description: 'University-licensed software catalog',
  },
  access: {
    read: publicAccess,
    create: editorAccess,
    update: editorAccess,
    delete: schoolAdminAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Software name (e.g. "Turnitin", "MATLAB", "Adobe Creative Cloud")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Plagiarism Detection', value: 'Plagiarism Detection' },
        { label: 'Research Software', value: 'Research Software' },
        { label: 'Productivity', value: 'Productivity' },
        { label: 'Statistical Software', value: 'Statistical Software' },
        { label: 'e-Governance', value: 'e-Governance' },
        { label: 'Designing Tools', value: 'Designing Tools' },
        { label: 'Scientific Software', value: 'Scientific Software' },
        { label: 'Simulation', value: 'Simulation' },
        { label: 'Other', value: 'Other' },
      ],
      admin: {
        description: 'Software category for filtering',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description of the software',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon',
      admin: {
        components: {
          Field: '@/components/admin/IconPickerField#IconPickerField',
        },
        description: 'Select a Lucide icon for the card',
      },
    },
    {
      name: 'users',
      type: 'text',
      admin: {
        description: 'Number of users (e.g. "1,309", "74,000+", "Site Licence")',
      },
    },
    {
      name: 'submissions',
      type: 'text',
      admin: {
        description: 'Number of submissions if applicable (e.g. "33,750"). Leave empty if N/A.',
      },
    },
    {
      name: 'licenses',
      type: 'text',
      admin: {
        description: 'Number of licenses (e.g. "100", "Site Licence", "Campus Agreement")',
      },
    },
    {
      name: 'validityStart',
      type: 'date',
      label: 'Validity Start Date',
      admin: {
        description: 'When the license started',
      },
    },
    {
      name: 'validityYears',
      type: 'text',
      label: 'Validity (Years)',
      admin: {
        description: 'License validity period (e.g. "3", "5", "Perpetual")',
      },
    },
    {
      name: 'issuedTo',
      type: 'textarea',
      label: 'Issued To',
      admin: {
        description: 'Departments or people the software is issued to',
      },
    },
    {
      name: 'remainingLicenses',
      type: 'text',
      label: 'Remaining Licenses',
      admin: {
        description: 'Number of remaining licenses',
      },
    },
    {
      name: 'licenseType',
      type: 'select',
      label: 'License Type',
      options: [
        { label: 'Network License', value: 'network' },
        { label: 'Network License with Key', value: 'networkKey' },
        { label: 'User/Key Based', value: 'userKey' },
        { label: 'Campus Agreement', value: 'campus' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'requestAccessUrl',
      type: 'text',
      label: 'Request Access URL',
      admin: {
        description: 'Link for requesting access to this software',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Expired', value: 'expired' },
        { label: 'Coming Soon', value: 'comingSoon' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this software prominently',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout',
      blocks: collectionBlocks,
      admin: {
        description: 'Optional page content blocks',
      },
    },
  ],
}
