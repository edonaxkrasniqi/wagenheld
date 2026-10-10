import type { AboutContent, ContactItem, HeroContent } from '@/lib/types'
import { company, openingHoursShort } from '@/lib/site'

/**
 * Alle Angaben stammen aus den Kundenkarten im Trello-Board "Wagenheld"
 * (Liste 🧹 Geklärt). Nichts hier ist erfunden. Was der Kunde nicht geliefert
 * hat, steht als OFFEN-Kommentar drüber und fehlt bewusst.
 */

export const heroContent: HeroContent = {
  // Kundenwortlaut (Änderungswunsch): „Qualität ist kein Ziel – es ist ein
  // Versprechen.“ Die Überschrift ist zweigeteilt, weil der Entwurf die erste
  // Hälfte in Gold setzt — im DOM bleibt es ein zusammenhängender Satz in
  // einer einzigen h1.
  //
  // Der Gedankenstrich hängt per geschütztem Leerzeichen (\u00A0) an
  // „Ziel“: sonst kann er auf schmalen Telefonen als erstes Zeichen einer
  // neuen Zeile landen. So bricht der Satz nur dort um, wo er auch inhaltlich
  // zerfällt — zwischen den beiden Halbsätzen.
  headlineAccent: 'Qualität ist kein Ziel\u00A0–',
  headline: 'es ist ein Versprechen.',
  paragraph:
    'Sorgfältig ausgewählte Gebrauchtwagen. Persönliche Beratung. Über 10 Jahre Erfahrung im Automobilhandel.',
  primaryCta: { label: 'Fahrzeuge ansehen', href: '#fahrzeuge' },
  secondaryCta: { label: 'Fahrzeug verkaufen', href: '#ankauf' },
  imageUrl: '/images/hero-front.webp',
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

/**
 * Kontaktwege in der Reihenfolge, in der Besucher sie nutzen: Anruf und
 * WhatsApp zuerst, weil ein Autokauf fast immer mit einer kurzen Frage
 * beginnt. Werte kommen aus lib/site.ts, damit Telefonnummer und Zeiten nicht
 * an mehreren Stellen auseinanderlaufen.
 */
export const contactItems: ContactItem[] = [
  {
    icon: 'call',
    label: 'Anrufen',
    value: company.phone,
    href: company.phoneHref,
  },
  {
    icon: 'chat',
    label: 'WhatsApp',
    value: 'Nachricht schreiben',
    href: company.whatsappHref,
    external: true,
  },
  {
    icon: 'mail',
    label: 'E-Mail schreiben',
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: 'schedule',
    label: 'Öffnungszeiten',
    value: openingHoursShort,
  },
  {
    icon: 'location_on',
    label: 'Vor Ort',
    value: `${company.street}, ${company.postalCode} ${company.city}`,
    href: 'https://www.openstreetmap.org/search?query=Im%20Schollengarten%2014%2C%2076646%20Bruchsal',
    external: true,
  },
  {
    icon: 'directions_car',
    label: 'Fahrzeugbestand',
    value: 'Tagesaktuell auf mobile.de',
    href: company.mobileDeUrl,
    external: true,
  },
]
