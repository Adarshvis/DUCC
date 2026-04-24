import React from 'react'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import config from '@/payload.config'
import { getPayload } from '@/lib/payload'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'

export const dynamic = 'force-dynamic'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' as any, depth: 1 })

  const favicon =
    siteSettings?.favicon && typeof siteSettings.favicon === 'object' && siteSettings.favicon.url
      ? siteSettings.favicon.url
      : undefined
 
  return {
    description: siteSettings?.siteName || 'DUCC — Delhi University Computer Centre',
    title: siteSettings?.siteName || 'DUCC',
    icons: favicon
      ? {
          icon: [{ url: favicon }],
          shortcut: [{ url: favicon }],
          apple: [{ url: favicon }],
        }
      : undefined,
  }
} 

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })

  const headerData = await payload.findGlobal({ slug: 'header' as any, depth: 2 }).catch(() => null)
  const footerData = await payload.findGlobal({ slug: 'footer' as any }).catch(() => null)
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' as any }).catch(() => null)

  const primaryColor = siteSettings?.themeColors?.primaryColor || '#4B2E83'
  const secondaryColor = siteSettings?.themeColors?.secondaryColor || '#1A103D'
  const accentColor = siteSettings?.themeColors?.accentColor || '#EAB308'
  const backgroundColor = siteSettings?.themeColors?.backgroundColor || '#FFFFFF'
  const surfaceColor = siteSettings?.themeColors?.surfaceColor || '#FFFFFF'
  const mutedBackgroundColor = siteSettings?.themeColors?.mutedBackgroundColor || '#F8F4FF'
  const textColor = siteSettings?.themeColors?.textColor || '#1A103D'

  const themeStyle = {
    '--cms-primary': primaryColor,
    '--cms-secondary': secondaryColor,
    '--cms-accent': accentColor,
    '--cms-bg': backgroundColor,
    '--cms-surface': surfaceColor,
    '--cms-muted-bg': mutedBackgroundColor,
    '--cms-text': textColor,
  } as React.CSSProperties

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen" style={themeStyle}>
        <Header data={headerData} />
        <main className="site-main flex-1">{children}</main>
        <Footer data={footerData} siteSettings={siteSettings} />
      </body>
    </html>
  )
}
