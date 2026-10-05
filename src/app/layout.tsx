import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { CommandPalette } from '@/components/CommandPalette'
import { RevealObserver } from '@/components/RevealObserver'
import { site } from '@/content/site'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Zach Redder: Software Developer, Human-Centered AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/og.png'],
  },
}

export const viewport: Viewport = { themeColor: '#101010', colorScheme: 'dark' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Software Developer',
  description: site.description,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['Software engineering', 'Artificial intelligence', 'Philosophy', 'Virtue ethics'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }} />
        {children}
        <CommandPalette />
        <RevealObserver />
      </body>
    </html>
  )
}
