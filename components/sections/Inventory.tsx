import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { inventoryContent } from '@/content/inventory'

/**
 * Die Bestand-Spalte als bildgetragenes Feld.
 *
 * Vorher stand das Foto lose unter dem Knopf und sah nach Lückenfüller aus.
 * Als angeschnittener Hintergrund trägt es die Spalte und gibt ihr das
 * Gewicht, das sie neben dem längeren Formular braucht.
 *
 * Der Verlauf ist unten deckend, weil der Text dort sitzt — die Aufnahme ist
 * ohnehin dunkel, aber die Lesbarkeit soll nicht vom Motiv abhängen.
 */
export function InventoryPanel() {
  return (
    <div
      id="fahrzeuge"
      className="relative flex min-h-[24rem] scroll-mt-20 flex-col justify-end overflow-hidden px-6 py-10 md:px-10 md:py-12"
    >
      <Image
        src="/images/Innenansicht.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/92 to-anthracite/55" />

      <div className="relative">
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          <span aria-hidden="true" className="h-px w-7 bg-gold/60" />
          {inventoryContent.label}
        </span>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-white text-balance">
          {inventoryContent.headline}
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
          {inventoryContent.paragraph}
        </p>

        <Link
          href={inventoryContent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-anthracite transition-colors hover:bg-secondary-fixed"
        >
          {inventoryContent.ctaLabel}
          <Icon name="open_in_new" className="text-base" />
          <span className="sr-only">(öffnet in neuem Tab)</span>
        </Link>
      </div>
    </div>
  )
}
