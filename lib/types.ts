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
  paragraph: string
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
} | null
