/**
 * Seed script: Creates the "Web Hosting" page in Payload CMS
 * using data fetched from https://ducc.du.ac.in/web-hosting/
 *
 * Run with: npx tsx src/scripts/seed-web-hosting.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// ── Lexical helpers ──

function textNode(text: string, format: number = 0): any {
  return { mode: 'normal', text, type: 'text', style: '', detail: 0, format, version: 1 }
}

function paragraph(children: any[]): any {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
    textStyle: '',
    textFormat: 0,
  }
}

function heading(children: any[], tag: string = 'h3'): any {
  return {
    type: 'heading',
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
    tag,
  }
}

function linkNode(text: string, url: string): any {
  return {
    type: 'link',
    format: '',
    indent: 0,
    version: 3,
    children: [textNode(text)],
    direction: 'ltr',
    fields: {
      linkType: 'custom',
      newTab: true,
      url,
    },
  }
}

function tableCell(children: any[], headerState?: number): any {
  return {
    type: 'tablecell',
    format: '',
    indent: 0,
    version: 1,
    children,
    direction: 'ltr',
    colSpan: 1,
    rowSpan: 1,
    headerState: headerState ?? 0,
    backgroundColor: null,
  }
}

function tableRow(cells: any[]): any {
  return {
    type: 'tablerow',
    format: '',
    indent: 0,
    version: 1,
    children: cells,
    direction: 'ltr',
  }
}

function table(rows: any[]): any {
  return {
    type: 'table',
    format: '',
    indent: 0,
    version: 1,
    children: rows,
    direction: 'ltr',
  }
}

function lexicalRoot(children: any[]): any {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
      direction: 'ltr',
    },
  }
}

// ── Data ──

interface WebHostingEntry {
  name: string
  url: string
}

interface WebHostingCategory {
  label: string
  entries: WebHostingEntry[]
  subgroups?: { heading: string; startIndex: number }[]
}

const categories: WebHostingCategory[] = [
  {
    label: 'Departments (42)',
    entries: [
      { name: 'Department of African Studies', url: 'http://as.du.ac.in' },
      { name: 'Department of Anthropology', url: 'http://anthro.du.ac.in' },
      { name: 'Department of Biochemistry', url: 'http://biochem.du.ac.in' },
      { name: 'Department of Biophysics', url: 'http://biophysics.du.ac.in' },
      { name: 'Department of Botany', url: 'http://botany.du.ac.in' },
      { name: 'Department of Chemistry', url: 'http://chemistry.du.ac.in' },
      { name: 'Department of Commerce', url: 'http://commerce.du.ac.in' },
      { name: 'Department of Computer Science', url: 'http://cs.du.ac.in' },
      { name: 'Department of Continuing Education and Extension', url: 'http://dacee.du.ac.in' },
      { name: 'Department of East Asian Studies', url: 'http://eas.du.ac.in' },
      { name: 'Department of Education', url: 'http://cie.du.ac.in' },
      { name: 'Department of Fine Arts', url: 'http://music.du.ac.in' },
      { name: 'Department of Genetics', url: 'http://genetics.du.ac.in' },
      { name: 'Department of Geography', url: 'http://geography.du.ac.in' },
      { name: 'Department of Geology', url: 'http://geology.du.ac.in' },
      { name: 'Department of Hindi', url: 'http://hindi.du.ac.in' },
      { name: 'Department of History', url: 'http://www.history.du.ac.in' },
      { name: 'Department of Law – CLC', url: 'http://clc.du.ac.in' },
      { name: 'Department of Law – LC1', url: 'http://lc1.du.ac.in' },
      { name: 'Department of Law – LC2', url: 'http://lc2.du.ac.in' },
      { name: 'Department of Library & Information Science', url: 'http://dlis.du.ac.in' },
      { name: 'Department of Mathematics', url: 'http://maths.du.ac.in' },
      { name: 'Department of Microbiology', url: 'http://microbio.du.ac.in' },
      { name: 'Department of Modern Indian Languages and Literary Studies', url: 'http://mil.du.ac.in' },
      { name: 'Department of Music', url: 'http://music.du.ac.in' },
      { name: 'Department of Persian', url: 'http://persian.du.ac.in' },
      { name: 'Department of Philosophy', url: 'http://philosophy.du.ac.in' },
      { name: 'Department of Physical Education and Sport Sciences', url: 'http://dudpess.du.ac.in' },
      { name: 'Department of Physics & Astrophysics', url: 'http://physics.du.ac.in' },
      { name: 'Department of Political Science', url: 'http://polscience.du.ac.in' },
      { name: 'Department of Psychology', url: 'http://psychology.du.ac.in' },
      { name: 'Department of Punjabi', url: 'http://punjabi.du.ac.in' },
      { name: 'Department of Sanskrit', url: 'http://sanskrit.du.ac.in' },
      { name: 'Department of Slavonic & Finno Ugrian Studies', url: 'http://sfus.du.ac.in' },
      { name: 'Department of Sociology', url: 'http://sociology.du.ac.in' },
      { name: 'Department of Statistics', url: 'http://statistics.du.ac.in' },
      { name: 'Department of Zoology', url: 'http://zoology.du.ac.in' },
      { name: 'Faculty of Homoeopathic Medicines', url: 'http://fhm.du.ac.in' },
      { name: 'Faculty of Law', url: 'http://lawfaculty.du.ac.in' },
      { name: 'Faculty of Medical Sciences', url: 'http://fmsc.du.ac.in' },
      { name: 'Faculty of Technology', url: 'http://fot.du.ac.in' },
      { name: '5-year Integrated Law Course, Faculty of Law', url: 'http://ilc.lawfaculty.du.ac.in' },
    ],
  },
  {
    label: 'Colleges (25)',
    entries: [
      { name: 'Satyawati College (Evening)', url: 'https://satyawatie.du.ac.in/' },
      { name: 'Kamala Nehru College', url: 'https://knc.du.ac.in' },
      { name: 'Swami Shraddhanand College', url: 'https://ss.du.ac.in' },
      { name: 'Janki Devi Memorial College', url: 'https://jdm.du.ac.in' },
      { name: 'Acharya Narendra Dev College', url: 'https://andcollege.du.ac.in/' },
      { name: 'Aditi Mahavidyalaya', url: 'https://aditi.du.ac.in/' },
      { name: 'Bhaskaracharya College of Applied Sciences', url: 'https://bcas.du.ac.in/' },
      { name: 'Daulat Ram College', url: 'https://dr.du.ac.in/' },
      { name: 'Delhi College of Arts & Commerce', url: 'https://dcac.du.ac.in/' },
      { name: 'Dyal Singh College', url: 'https://dsc.du.ac.in/' },
      { name: 'Dyal Singh College (Evening)', url: 'https://dsce.du.ac.in/' },
      { name: 'Gargi College', url: 'https://www.gargicollege.in/' },
      { name: 'Indira Gandhi Institute of Physical Education & Sports Sciences', url: 'https://igipess.du.ac.in/' },
      { name: 'Kalindi College for Women', url: 'https://kalindi.du.ac.in/' },
      { name: 'Keshav Mahavidyalaya', url: 'https://keshav.du.ac.in/' },
      { name: 'Maharaja Agarsen College', url: 'https://mac.du.ac.in/' },
      { name: 'Ramjas College', url: 'https://ramjas.du.ac.in/' },
      { name: 'Satyawati College', url: 'https://satyawati.du.ac.in/' },
      { name: 'School of Open Learning', url: 'https://sol.du.ac.in' },
      { name: 'Shaheed Sukhdev College of Business Studies', url: 'https://sscbs.du.ac.in/' },
      { name: 'Shyam Lal College', url: 'https://slc.du.ac.in/' },
      { name: 'Shyam Lal College (Evening)', url: 'https://shyamlale.du.ac.in/' },
      { name: 'Shyama Prasad Mukherji College for Women', url: 'https://spm.du.ac.in/' },
      { name: 'Sri Aurobindo College', url: 'https://aurobindo.du.ac.in/' },
      { name: 'Shyam Lal College (Evening)', url: 'https://shyamlale.du.ac.in/' },
    ],
  },
  {
    label: 'Hostels (14)',
    subgroups: [
      { heading: 'NORTH CAMPUS', startIndex: 0 },
      { heading: 'SOUTH CAMPUS', startIndex: 11 },
    ],
    entries: [
      { name: 'Meghdoot Hostel', url: 'http://meghdoothostel.du.ac.in' },
      { name: 'Rajiv Gandhi Hostel for Girls', url: 'http://rghg.du.ac.in' },
      { name: 'Department of Social Work Hostel', url: 'http://dswh.du.ac.in' },
      { name: 'Post Graduate Hostel for Men', url: 'http://pgmenhosteludsc.du.ac.in' },
      { name: 'D.S. Kothari Hostel', url: 'http://kotharihostel.du.ac.in' },
      { name: 'Jubilee Hall', url: 'http://jubileehall.du.ac.in' },
      { name: 'Gwyer Hall', url: 'http://gwyerhall.du.ac.in' },
      { name: "International Student's House", url: 'http://ish.du.ac.in' },
      { name: 'University Hostel for Women', url: 'http://uhw.du.ac.in' },
      { name: 'V.K.R.V. Rao Hostel', url: 'http://vkrvrao.du.ac.in' },
      { name: 'WUS University Hostel', url: 'http://wusuhw.du.ac.in' },
      { name: 'Geetanjali Hostel', url: 'http://geetanjalihostel.du.ac.in' },
      { name: 'Mansarowar Hostel', url: 'http://mansarowar.du.ac.in' },
      { name: 'V.K.R.V. Rao Hostel (South)', url: 'http://vkrvrao.du.ac.in' },
    ],
  },
  {
    label: 'Centres / Institutes (12)',
    entries: [
      { name: 'Centre for Tribal Studies', url: 'http://cts.du.ac.in' },
      { name: 'Center for Community Development & Action', url: 'http://ccda.socialwork.du.ac.in' },
      { name: 'Delhi University Social Centre CO-Ed School', url: 'http://duscss.du.ac.in' },
      { name: 'Centre for Global Studies', url: 'http://cgs.du.ac.in' },
      { name: 'Cluster Innovation Centre (CIC)', url: 'http://cic.du.ac.in' },
      { name: 'Centre for Innovation in Infectious Disease Research, Education and Training (CIIDRET)', url: 'http://ciidret.du.ac.in' },
      { name: 'Centre for Science Education & Communication', url: 'http://csec.du.ac.in' },
      { name: 'Institute of Lifelong Learning (ILLL)', url: 'http://illl.du.ac.in' },
      { name: 'Institute of Informatics & Communication (IIC)', url: 'http://iic.ac.in' },
      { name: 'Women Studies & Development Centre (WSDC)', url: 'http://wsdc.du.ac.in' },
      { name: 'Centre for Independence and Partition Studies', url: 'http://cips.du.ac.in' },
      { name: 'Centre for Science Education and Communication (CSEC)', url: 'http://csec.du.ac.in' },
    ],
  },
  {
    label: 'Other Sub Domains (48)',
    entries: [
      { name: 'BIONEST', url: 'http://bionest.du.ac.in' },
      { name: "Proforma for Teacher's Representatives", url: 'http://tr.du.ac.in' },
      { name: 'Ph.D. Extension Application', url: 'http://phdext.du.ac.in/student_form' },
      { name: 'International Seminar (Pol. Science)', url: 'http://events.du.ac.in' },
      { name: 'DU Library System', url: 'http://eb.du.ac.in' },
      { name: 'DU Alumni', url: 'http://alumni.du.ac.in' },
      { name: 'CIE Alumni Association', url: 'http://alumni.cie.du.ac.in' },
      { name: 'Value Addition Courses (VAC)', url: 'http://vac.du.ac.in' },
      { name: 'Unnat Bharat Abhiyan', url: 'http://uba.du.ac.in' },
      { name: 'Indian Journal of Social Work Education and Practice', url: 'http://ilc.lawfaculty.du.ac.in' },
      { name: '5-year Integrated Law Course', url: 'http://ilc.lawfaculty.du.ac.in' },
      { name: 'Conference on Reproductive Sciences', url: 'http://icrsmm.zoology.du.ac.in' },
      { name: '101th Annual Report', url: 'http://annualreport.du.ac.in' },
      { name: 'Certificate course on Patents', url: 'http://ccp.rc.du.ac.in' },
      { name: 'Women Empowerment Sports Seminar', url: 'http://nswis.clc.du.ac.in' },
      { name: 'NWAV Asia-Pacific', url: 'http://nwavap.du.ac.in' },
      { name: 'Journal of Commerce & Business Studies', url: 'http://journal.commerce.du.ac.in' },
      { name: 'VAGEESHWARI Journal', url: 'http://ejournal.music.du.ac.in' },
      { name: 'DU Thrift & Credit Society', url: 'http://dusociety.du.ac.in' },
      { name: 'Delhi University Library System (DULS)', url: 'http://duls.du.ac.in/duls' },
      { name: 'NAAC SSR Report', url: 'http://naac.du.ac.in' },
      { name: 'National Cadet Corps', url: 'http://ncc.du.ac.in' },
      { name: 'NCWEB', url: 'http://ncweb.du.ac.in' },
      { name: 'Neuropharmacology Lab', url: 'http://nddl.dr.du.ac.in' },
      { name: 'National Service Scheme', url: 'http://nss.du.ac.in' },
      { name: 'Computational Linguistics', url: 'http://cl.sanskrit.du.ac.in' },
      { name: "DU Students' Welfare", url: 'http://dsw.du.ac.in' },
      { name: "DU Women's Association (DUWA)", url: 'http://duwa.du.ac.in' },
      { name: 'Examination Wing', url: 'http://exam.du.ac.in' },
      { name: 'W.U.S. Health Centre', url: 'http://healthcentre.du.ac.in' },
      { name: 'Aerospace Testing Facilities', url: 'http://atfi.dlis.du.ac.in' },
      { name: 'Cyber Security & Law', url: 'http://icsl.du.ac.in' },
      { name: 'School of Journalism', url: 'http://dsj.du.ac.in' },
      { name: 'DU Library System (CRL)', url: 'http://crl.du.ac.in' },
      { name: 'Green Chemistry Network', url: 'http://greenchem.du.ac.in' },
      { name: 'Equal Opportunity Cell', url: 'http://eoc.du.ac.in' },
      { name: 'World University Service', url: 'http://wus.du.ac.in' },
      { name: 'DU Computer Centre', url: 'http://ducc.du.ac.in' },
      { name: 'Rajbhasha Cell', url: 'http://rajbhasha.du.ac.in' },
      { name: 'DU Journal Portal', url: 'http://journals.du.ac.in' },
      { name: 'Placement Cell (Ananya)', url: 'http://placement.maths.du.ac.in' },
      { name: 'Medical Reimbursement', url: 'http://appmedical.du.ac.in' },
      { name: 'DUCC No-Dues Portal', url: 'http://duccnodues.du.ac.in' },
      { name: 'Engineering Department', url: 'http://engg.du.ac.in' },
      { name: 'DUCC HelpDesk', url: 'http://helpdesk.ducc.du.ac.in' },
      { name: 'Institution of Eminence', url: 'http://ioe.du.ac.in' },
      { name: 'Network Helpdesk', url: 'http://network.ducc.du.ac.in' },
      { name: 'Viksit Bharat @ 2047', url: 'http://viksitbharat2047.du.ac.in' },
    ],
  },
]

// ── Build Lexical table content for a category ──

function buildCategoryContent(cat: WebHostingCategory): any {
  const headerRow = tableRow([
    tableCell([paragraph([textNode('#', 1)])], 1),       // bold, header
    tableCell([paragraph([textNode('Name', 1)])], 1),
    tableCell([paragraph([textNode('Website', 1)])], 1),
  ])

  const dataRows: any[] = []
  let num = 1

  for (let i = 0; i < cat.entries.length; i++) {
    // Check if there's a subgroup heading at this index
    if (cat.subgroups) {
      const sg = cat.subgroups.find((s) => s.startIndex === i)
      if (sg) {
        dataRows.push(
          tableRow([
            tableCell([paragraph([])], 0),
            tableCell([paragraph([textNode(sg.heading, 1)])], 0), // bold subheading
            tableCell([paragraph([])], 0),
          ]),
        )
      }
    }

    const entry = cat.entries[i]
    const domain = entry.url.replace(/^https?:\/\//, '').replace(/\/$/, '')

    dataRows.push(
      tableRow([
        tableCell([paragraph([textNode(String(num))])], 0),
        tableCell([paragraph([textNode(entry.name)])], 0),
        tableCell([paragraph([linkNode(domain, entry.url)])], 0),
      ]),
    )
    num++
  }

  return lexicalRoot([table([headerRow, ...dataRows])])
}

// ── Main seed function ──

async function seed() {
  const payload = await getPayload({ config })

  // Check if page already exists
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'web-hosting' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('[Seed] "Web Hosting" page already exists (id:', existing.docs[0].id, '). Updating...')

    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: buildPageData() as any,
    })

    console.log('[Seed] Updated successfully.')
  } else {
    const page = await payload.create({
      collection: 'pages',
      data: buildPageData() as any,
    })

    console.log('[Seed] Created "Web Hosting" page with id:', page.id)
  }

  process.exit(0)
}

function buildPageData() {
  // Build tabs from categories
  const tabs = categories.map((cat) => ({
    label: cat.label,
    content: buildCategoryContent(cat),
  }))

  return {
    title: 'Web Hosting',
    slug: 'web-hosting',
    bannerEyebrow: 'WEB HOSTING SERVICES',
    bannerDescription:
      'DUCC provides web-hosting services for Department, Centre, College & Hostel webpages. List of websites hosted by DUCC, maintained by Departments, Colleges, Centres/Institutes, Hostels and others.',
    status: 'published',
    showInNav: false,
    navOrder: 0,
    meta: {
      title: 'Web Hosting Services — DUCC',
      description:
        'List of websites hosted by Delhi University Computer Centre (DUCC) for Departments, Colleges, Centres, Hostels and other sub-domains.',
    },
    layout: [
      // Block 1: Rich Content — intro
      {
        blockType: 'richContent',
        maxWidth: 'full',
        content: lexicalRoot([
          paragraph([
            textNode(
              'DUCC provides web-hosting services for Department, Centre, College & Hostel webpages. To avail the facility of web-hosting for Colleges, Departments, Centres & Hostels website, please contact DUCC.',
            ),
          ]),
        ]),
      },
      // Block 2: Tabs — all categories
      {
        blockType: 'tabs',
        sectionHeading: 'List of Websites Hosted by DUCC',
        tabs,
      },
      // Block 3: CTA
      {
        blockType: 'callToAction',
        heading: 'Need Web Hosting?',
        description:
          'Contact DUCC to request web hosting for your department, college, centre or hostel.',
        buttonLabel: 'Request Web Hosting',
        buttonUrl: '/it-request?service=Web Hosting',
        layout: 'duccBanner',
      },
    ],
  }
}

seed().catch((err) => {
  console.error('[Seed] Failed:', err)
  process.exit(1)
})
