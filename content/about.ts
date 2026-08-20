import type { AboutContent, ContactItem, HeroContent } from '@/lib/types'

/**
 * Alle Angaben stammen aus den Kundenkarten im Trello-Board "Wagenheld"
 * (Liste 🧹 Geklärt). Nichts hier ist erfunden. Was der Kunde nicht geliefert
 * hat, steht als OFFEN-Kommentar drüber und fehlt bewusst.
 */

export const heroContent: HeroContent = {
  label: 'Automobilzentrum Wagenheld · Bruchsal',
  headline: 'WAGENHELD',
  // OFFEN (Ari): Der endgültige Slogan fehlt. Bis dahin steht hier die
  // Formulierung aus der Kundenkarte #21 im Original-Wortlaut.
  slogan: 'Erfahrung, auf die Sie sich verlassen können.',
  paragraph:
    'Sorgfältig ausgewählte Gebrauchtwagen aus über 10 Jahren Erfahrung im Gebrauchtwagenhandel. Persönliche Beratung in Bruchsal, Zulassung im Raum Karlsruhe.',
  primaryCta: { label: 'Fahrzeuge ansehen', href: '#fahrzeuge' },
  secondaryCta: { label: 'Fahrzeug verkaufen', href: '#ankauf' },
  // OFFEN (Ari): Die drei Fotos vom 17.08. liegen als Trello-Karten #1–3.
  // Sobald geklärt ist, ob das die Aufnahmen des Autozentrums sind, ersetzen
  // sie dieses Bild.
  imageUrl: '/images/hero.jpg',
  imageAlt:
    'Fahrzeuge auf dem Gelände des Automobilzentrums Wagenheld in Bruchsal',
}

export const aboutContent: AboutContent = {
  label: 'Über Wagenheld',
  headline: 'Ein Gebrauchtwagenhandel, der aus Erfahrung auswählt.',
  paragraphs: [
    'Das Automobilzentrum Wagenheld ist ein Gebrauchtwagenhandel in Bruchsal. Dahinter stehen über zehn Jahre Erfahrung im Gebrauchtwagenhandel — und ein Bestand, den wir nicht nach Masse, sondern nach Zustand zusammenstellen.',
    'Wir zeigen Ihnen die Wartungshistorie eines Fahrzeugs, nehmen Ihren Wagen zu einem fairen Preis in Zahlung und übernehmen die Zulassung im Raum Karlsruhe. Was wir nicht wissen, sagen wir Ihnen. Das ist der ganze Trick.',
  ],
  ctaLabel: 'Kontakt aufnehmen',
  imageUrl: '/images/about.jpg',
  imageAlt: 'Verkaufsgespräch im Automobilzentrum Wagenheld',
}

// OFFEN (Ari): Öffnungszeiten sind bislang nicht geliefert worden. Deshalb
// steht hier keine Kachel dazu — geraten wird nicht.
export const contactItems: ContactItem[] = [
  {
    icon: 'call',
    label: 'Anrufen',
    value: '0179 1596072',
    href: 'tel:+491791596072',
  },
  {
    icon: 'mail',
    label: 'E-Mail schreiben',
    value: 'info@automobilzentrum-wagenheld.de',
    href: 'mailto:info@automobilzentrum-wagenheld.de',
  },
  {
    icon: 'location_on',
    label: 'Vor Ort',
    value: 'Im Schollengarten 14, 76646 Bruchsal',
    href: 'https://www.openstreetmap.org/search?query=Im%20Schollengarten%2014%2C%2076646%20Bruchsal',
    external: true,
  },
  {
    icon: 'directions_car',
    label: 'Fahrzeugbestand',
    value: 'Tagesaktuell auf mobile.de',
    href: 'https://home.mobile.de/AUTOMOBILZENTRUMWAGENHELDGBR',
    external: true,
  },
]

export const sellingImageUrl = '/images/ankauf.jpg'
