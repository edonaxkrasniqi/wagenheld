import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { company } from '@/lib/site'

export const metadata: Metadata = {
  // Kein eigenes `robots`: Next.js setzt auf der 404-Seite selbst `noindex`.
  // Ein zweites Tag daneben wäre doppelt.
  title: `Seite nicht gefunden — ${company.shortName}`,
}

/**
 * Eigene 404-Seite (GO-LIVE.md, Abschnitt C).
 *
 * Die Standardseite von Next.js hat keinen Footer — wer auf einem toten Link
 * landete, erreichte Impressum und Datenschutzerklärung nicht mehr mit einem
 * Klick. Deshalb hier mit Kopf- und Fußleiste, und mit den Wegen, die Besucher
 * an dieser Stelle tatsächlich weiterbringen.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" tabIndex={-1} className="bg-surface-lowest pt-16 flex-1 outline-none">
        <div className="max-w-[760px] mx-auto px-5 md:px-10 py-24 md:py-32">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-ink mb-4">
            Fehler 404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-balance">
            Diese Seite gibt es nicht.
          </h1>
          <p className="text-on-surface-variant leading-relaxed mb-10">
            Vielleicht war der Link veraltet oder hatte einen Tippfehler. Unseren
            aktuellen Bestand und alle Kontaktwege finden Sie auf der Startseite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-warm-ink px-8 py-4 text-sm font-bold uppercase tracking-wider text-card transition-colors hover:bg-warm-muted"
            >
              Zur Startseite
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center rounded-lg border border-outline-variant px-8 py-4 text-sm font-bold uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-high"
            >
              Anrufen: {company.phone}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
