import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { InventoryAndSelling } from '@/components/sections/InventoryAndSelling'
import { Reviews } from '@/components/sections/Reviews'
import { About } from '@/components/sections/About'
import { ContactBar } from '@/components/sections/ContactBar'
import { Footer } from '@/components/sections/Footer'
import { pageConfig } from '@/content/pageConfig'
import type { SectionId } from '@/lib/types'
import { baseOpenGraph } from '@/lib/metadata'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { ...baseOpenGraph, url: siteUrl },
}

const sectionComponents: Record<SectionId, () => React.ReactNode> = {
  header: Header,
  hero: Hero,
  benefits: Benefits,
  inventoryAndSelling: InventoryAndSelling,
  reviews: Reviews,
  about: About,
  contactBar: ContactBar,
  footer: Footer,
}

/**
 * Header und Footer stehen außerhalb von <main>, damit die Seite genau eine
 * Hauptregion hat. Sonst springt der Sprunglink ins Menü statt in den Inhalt.
 */
export default function Home() {
  const ids = pageConfig.sections.map((section) => section.id)
  const hasHeader = ids.includes('header')
  const hasFooter = ids.includes('footer')
  const mainIds = ids.filter((id) => id !== 'header' && id !== 'footer')

  return (
    <div className="flex flex-col flex-1">
      {hasHeader && <Header />}
      <main id="inhalt" tabIndex={-1} className="flex flex-col flex-1 outline-none">
        {mainIds.map((id) => {
          const Section = sectionComponents[id]
          return <Section key={id} />
        })}
      </main>
      {hasFooter && <Footer />}
    </div>
  )
}
