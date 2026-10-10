import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { siteUrl, company, openingHours } from '@/lib/site'
import { baseOpenGraph, siteDescription, siteTitle } from '@/lib/metadata'
import { MobileNav } from '@/components/sections/MobileNav'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: baseOpenGraph,
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}

/**
 * Strukturierte Daten für Google. Enthält ausschließlich belegte Angaben —
 * die Öffnungszeiten stammen aus dem Google-Profil des Betriebs (siehe
 * lib/site.ts). Bewertungen fehlen bewusst: selbst ausgezeichnete Sterne
 * wertet Google bei lokalen Unternehmen ohnehin nicht aus, und erfundene Werte
 * wären genauso angreifbar wie auf der Seite selbst.
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
  openingHoursSpecification: openingHours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
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
      <head>
        {/*
          Die Symbol-Schrift steht mit `font-display: block` in globals.css —
          bis sie da ist, bleiben die Icons unsichtbar statt als Klartext
          („directions_car“) aufzutauchen. Vorladen verkürzt dieses Fenster;
          ohne Preload entdeckt der Browser die Datei erst über das CSS.
        */}
        <link
          rel="preload"
          href="/fonts/material-symbols-outlined.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/*
          Entsperrung der Reveal-Animation für Besucher ohne JavaScript.

          Der Versteckzustand liegt in app/globals.css und wird sonst erst von
          components/ui/Reveal.tsx wieder aufgehoben. Ohne diesen Block bliebe
          bei abgeschaltetem JavaScript die halbe Seite dauerhaft leer —
          inklusive Kontaktdaten und Impressum-Link im Footer.

          Hinweis für die spätere scharfe CSP: Dieses <style> ist inline und
          braucht dann einen Hash in `style-src`. Solange die Policy als
          Report-Only läuft (siehe next.config.ts), taucht es nur im Bericht auf.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
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
