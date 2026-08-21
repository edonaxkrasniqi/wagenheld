import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { inventoryContent } from '@/content/inventory'

/**
 * Nur der Inhalt, ohne eigenen Abschnitt: die Spalte sitzt zusammen mit dem
 * Ankauf-Formular in `InventoryAndSelling`. Verkaufen und Verkaufen-lassen
 * sind die beiden Wege, die ein Besucher hier gehen kann — sie nebeneinander
 * zu zeigen macht das sichtbar, untereinander liest es sich wie zwei
 * unabhängige Angebote.
 */
export function InventoryPanel() {
  return (
    <div id="fahrzeuge" className="scroll-mt-20">
      <Icon name="directions_car" className="text-gold text-4xl" />

      <span className="mt-5 block text-xs font-bold uppercase tracking-[0.2em] text-gold">
        {inventoryContent.label}
      </span>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
        {inventoryContent.headline}
      </h2>

      <p className="mt-5 text-white/75 leading-relaxed">{inventoryContent.paragraph}</p>

      <Link
        href={inventoryContent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 bg-gold text-anthracite text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-secondary-fixed transition-colors"
      >
        {inventoryContent.ctaLabel}
        <Icon name="open_in_new" className="text-lg" />
        <span className="sr-only">(öffnet in neuem Tab)</span>
      </Link>
    </div>
  )
}
