import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { inventoryContent } from '@/content/inventory'

export function Inventory() {
  return (
    <section id="fahrzeuge" className="bg-background scroll-mt-24">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="bg-anthracite rounded-lg px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center gap-5">
          <Icon name="directions_car" className="text-gold text-5xl" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {inventoryContent.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
            {inventoryContent.headline}
          </h2>
          <p className="max-w-xl text-white/70">{inventoryContent.paragraph}</p>
          <Link
            href={inventoryContent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-anthracite text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-secondary-fixed transition-colors mt-3"
          >
            {inventoryContent.ctaLabel}
            <Icon name="open_in_new" className="text-lg" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
