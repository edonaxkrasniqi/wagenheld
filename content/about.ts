import type { AboutContent, ContactItem, HeroContent } from '@/lib/types'

/**
 * Alle Angaben stammen aus den Kundenkarten im Trello-Board "Wagenheld"
 * (Liste 🧹 Geklärt). Nichts hier ist erfunden. Was der Kunde nicht geliefert
 * hat, steht als OFFEN-Kommentar drüber und fehlt bewusst.
 */

export const heroContent: HeroContent = {
  // Wortlaut aus dem Kundenentwurf vom 17.08. Die Überschrift ist zweigeteilt,
  // weil der Entwurf die erste Hälfte in Gold setzt — im DOM bleibt es ein
  // zusammenhängender Satz in einer einzigen h1.
  headlineAccent: 'Qualität ist kein Ziel –',
  headline: 'sie ist unser Versprechen.',
  paragraph:
    'Sorgfältig ausgewählte Gebrauchtwagen. Persönliche Beratung. Über 10 Jahre Erfahrung im Automobilhandel.',
  primaryCta: { label: 'Fahrzeuge ansehen', href: '#fahrzeuge' },
  secondaryCta: { label: 'Fahrzeug verkaufen', href: '#ankauf' },
  imageUrl: '/images/Header_final.png',
  imageAlt:
    'Front einer dunklen Limousine vor schwarzem Hintergrund, beleuchtet vom eigenen Tagfahrlicht',
}

export const aboutContent: AboutContent = {
  label: 'Über uns',
  // Überschrift und beide Absätze im Kundenwortlaut vom 17.08.
  headline: 'Erfahrung, auf die Sie sich verlassen können.',
  paragraphs: [
    'Hinter Wagenheld stehen über 10 Jahre Erfahrung in der Automobilbranche – insbesondere im An- und Verkauf von Fahrzeugen. Wir wissen, worauf es beim Fahrzeugkauf ankommt und legen Wert auf eine ehrliche, unkomplizierte Beratung auf Augenhöhe.',
    'Unser Anspruch ist einfach: sorgfältig ausgewählte Fahrzeuge, transparente Angebote und ein Service, bei dem Sie sich von der ersten Besichtigung bis zur Übergabe gut aufgehoben fühlen.',
  ],
  ctaLabel: 'Kontakt aufnehmen',
  imageUrl: '/images/ankauf.jpg',
  imageAlt:
    'Fahrzeugschlüssel auf einem Besprechungstisch im Automobilzentrum Wagenheld',
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
