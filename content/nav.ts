import type { NavItem, FooterNavColumn } from '@/lib/types'

export const navItems: NavItem[] = [
  { label: 'Startseite', href: '/', active: true, icon: 'home' },
  { label: 'Fahrzeuge', href: '/#fahrzeuge', icon: 'directions_car' },
  { label: 'Ankauf', href: '/#ankauf', icon: 'sell' },
  { label: 'Leistungen', href: '/#leistungen', icon: 'handyman' },
  { label: 'Über uns', href: '/#ueber-uns', icon: 'info' },
  { label: 'Kontakt', href: '/#kontakt', icon: 'contact_support' },
]

/**
 * Vorher zeigten hier vier Links ins Leere (href: '#') auf Leistungen, die
 * der Kunde nie genannt hat — Leasing, Werkstatt-Service, Garantie-Check.
 * Ersetzt durch die tatsächlich vorhandenen Abschnitte und Pflichtseiten.
 */
export const footerNavColumns: FooterNavColumn[] = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Fahrzeuge auf mobile.de', href: '/#fahrzeuge' },
      { label: 'Fahrzeug verkaufen', href: '/#ankauf' },
      { label: 'Leistungen', href: '/#leistungen' },
      { label: 'Über uns', href: '/#ueber-uns' },
      { label: 'Kontakt', href: '/#kontakt' },
    ],
  },
  {
    heading: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutzerklärung', href: '/datenschutz' },
    ],
  },
]
