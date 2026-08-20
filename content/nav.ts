import type { NavItem, FooterNavColumn } from '@/lib/types'

export const navItems: NavItem[] = [
  { label: 'Startseite', href: '#', active: true, icon: 'home' },
  { label: 'Fahrzeuge', href: '#fahrzeuge', icon: 'directions_car' },
  { label: 'Ankauf', href: '#ankauf', icon: 'sell' },
  { label: 'Leistungen', href: '#leistungen', icon: 'handyman' },
  { label: 'Über uns', href: '#ueber-uns', icon: 'info' },
  { label: 'Kontakt', href: '#kontakt', icon: 'contact_support' },
]

export const footerNavColumns: FooterNavColumn[] = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Startseite', href: '#' },
      { label: 'Fahrzeuge auf mobile.de', href: '#fahrzeuge' },
      { label: 'Ankauf & Bewertung', href: '#ankauf' },
      { label: 'Serviceleistungen', href: '#leistungen' },
    ],
  },
  {
    heading: 'Leistungen',
    links: [
      { label: 'Finanzierung', href: '#' },
      { label: 'Leasing', href: '#' },
      { label: 'Werkstatt-Service', href: '#' },
      { label: 'Garantie-Check', href: '#' },
    ],
  },
]
