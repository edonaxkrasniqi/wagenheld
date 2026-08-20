import type { AboutContent, ContactItem, HeroContent } from '@/lib/types'

export const heroContent: HeroContent = {
  label: 'Automobilzentrum',
  headline: 'WAGENHELD',
  paragraph:
    'Qualität ist kein Ziel — es ist ein Versprechen. Ihr kompetenter Partner für Premiumfahrzeuge und erstklassigen Service in der Region.',
  primaryCta: { label: 'Fahrzeug kaufen', href: '#fahrzeuge' },
  secondaryCta: { label: 'Jetzt kontaktieren', href: '#kontakt' },
  imageUrl: '/images/hero.jpg',
  imageAlt:
    'WAGENHELD Autohaus bei Sonnenuntergang mit drei Premiumfahrzeugen vor dem Gebäude',
}

export const aboutContent: AboutContent = {
  label: 'Über Wagenheld',
  headline: 'Tradition trifft moderne Mobilität.',
  paragraphs: [
    'Seit über 15 Jahren stehen wir für Vertrauen und Qualität im Automobilhandel. Unser Anspruch ist es, für jeden Kunden das perfekt passende Fahrzeug zu finden.',
    'In unserer modernen Betriebsstätte kombinieren wir fachliche Expertise mit einer Leidenschaft für Technik. Jedes Fahrzeug durchläuft bei uns einen strengen Qualitätscheck, bevor es in den Verkauf geht.',
  ],
  ctaLabel: 'Mehr über uns',
  imageUrl: '/images/about.jpg',
  imageAlt: 'Moderner Autohaus-Showroom von WAGENHELD mit ausgestellten Fahrzeugen',
}

export const contactItems: ContactItem[] = [
  {
    icon: 'call',
    label: 'Rufen Sie uns an',
    value: '+49 (0) 123 456 789',
    href: 'tel:+490123456789',
  },
  {
    icon: 'mail',
    label: 'E-Mail schreiben',
    value: 'info@wagenheld.de',
    href: 'mailto:info@wagenheld.de',
  },
  {
    icon: 'location_on',
    label: 'Besuchen Sie uns',
    value: 'Automobilstraße 1, Berlin',
  },
  {
    icon: 'schedule',
    label: 'Öffnungszeiten',
    value: 'Mo–Fr: 09:00–18:00 Uhr',
  },
]

export const sellingImageUrl = '/images/ankauf.jpg'
