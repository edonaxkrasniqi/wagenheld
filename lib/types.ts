export type SectionId =
  | 'header'
  | 'hero'
  | 'benefits'
  | 'inventoryAndSelling'
  | 'reviews'
  | 'about'
  | 'contactBar'
  | 'footer'

export interface SectionConfig {
  id: SectionId
}

export interface PageConfig {
  sections: SectionConfig[]
}

export interface NavItem {
  label: string
  href: string
  active?: boolean
  icon?: string
}

export interface FooterNavColumn {
  heading: string
  links: Array<{ label: string; href: string }>
}

export interface Benefit {
  icon: string
  headline: string
  description: string
}

export interface InventoryContent {
  label: string
  headline: string
  /**
   * Ein Eintrag je Absatz. Bewusst ein Array und kein Fließtext mit `\n`:
   * so entsteht je Absatz ein eigenes <p>, und der Abstand dazwischen kommt
   * aus dem Designsystem statt aus einem Zeilenumbruch im Text.
   */
  paragraphs: string[]
  ctaLabel: string
  url: string
}

export interface Review {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  body: string
  timeAgo: string
}

export interface GoogleRating {
  score: number
  count: number
  reviewsUrl: string
  logoUrl: string
}

export interface AboutContent {
  label: string
  headline: string
  paragraphs: string[]
  ctaLabel: string
  imageUrl: string
  imageAlt: string
}

export interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
  /** Öffnet in einem neuen Tab, mit rel="noopener noreferrer". */
  external?: boolean
}

export interface HeroContent {
  /** Erster Teil der Überschrift, in Gold gesetzt. */
  headlineAccent: string
  /** Zweiter Teil, in Weiß. Beide zusammen ergeben einen Satz in einer h1. */
  headline: string
  paragraph: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  imageUrl: string
  imageAlt: string
}

export type FormState = {
  success: boolean
  message: string
  /**
   * Fehlermeldung je Feldname. Das Formular hängt sie per
   * `aria-describedby` an das jeweilige Feld und setzt `aria-invalid` —
   * eine Sammelmeldung über dem Knopf sagt Screenreader-Nutzern nicht, *wo*
   * der Fehler steckt.
   */
  fieldErrors?: Record<string, string>
  /**
   * Die abgeschickten Eingaben, damit sie nach einem Fehler nicht verloren
   * gehen. React setzt ein Formular nach jeder Server Action zurück; ohne
   * diese Werte müsste man nach einem Tippfehler im Datum alles neu eingeben.
   */
  values?: Record<string, string>
} | null
