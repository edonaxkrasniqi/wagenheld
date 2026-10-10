import type { Metadata } from 'next'
import { company } from '@/lib/site'

export const siteTitle = 'Automobilzentrum Wagenheld — Gebrauchtwagen in Bruchsal'
export const siteDescription =
  'Sorgfältig ausgewählte Gebrauchtwagen in Bruchsal. Über 10 Jahre Erfahrung, Inzahlungnahme zu fairem Preis und Zulassung im Raum Karlsruhe.'

/**
 * Open-Graph-Grundwerte. Next.js führt `openGraph` zwischen Layout und Seite
 * nicht zusammen, sondern ersetzt es als Ganzes — wer auf einer Seite die
 * `url` setzt, muss den Rest mitgeben. Deshalb liegt der Rest hier.
 *
 * Canonical und `og:url` stehen bewusst NICHT im Layout: von dort erben sie
 * alle Unterseiten, und Impressum, Datenschutz und die 404-Seite gaben sich
 * dann als Startseite aus.
 */
export const baseOpenGraph = {
  title: siteTitle,
  description: siteDescription,
  siteName: company.shortName,
  locale: 'de_DE',
  type: 'website',
} satisfies Metadata['openGraph']
