import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { siteUrl, company } from '@/lib/site'
import { MobileNav } from '@/components/sections/MobileNav'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const title = 'Automobilzentrum Wagenheld — Gebrauchtwagen in Bruchsal'
const description =
  'Sorgfältig ausgewählte Gebrauchtwagen in Bruchsal. Über 10 Jahre Erfahrung, Inzahlungnahme zu fairem Preis und Zulassung im Raum Karlsruhe.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: company.shortName,
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

/**
 * Strukturierte Daten für Google. Enthält ausschließlich Angaben, die vom
 * Kunden bestätigt sind. Öffnungszeiten und Bewertungen fehlen bewusst —
 * erfundene Werte hier wären genauso angreifbar wie auf der Seite selbst.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: company.legalName,
  url: siteUrl,
  email: company.email,
  telephone: '+491791596072',
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.country,
  },
  sameAs: [company.mobileDeUrl],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        {children}
        <MobileNav />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}
