import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { inventoryContent } from '@/content/inventory'

/**
 * Bestand-Karte in warmem Sand, mit der Innenansicht oben.
 *
 * Das Bild ist nicht gerahmt, sondern läuft nach unten in den Kartenton aus.
 * Eine harte Bildkante mitten in der Karte hätte sie in zwei Hälften geteilt;
 * so bleibt sie ein Element.
 */
export function InventoryPanel() {
  return (
    <div
      id="fahrzeuge"
      className="flex h-full scroll-mt-20 flex-col overflow-hidden rounded-[24px] bg-sand"
    >
      <div className="relative h-52 shrink-0 md:h-64">
        <Image
          src="/images/innenansicht.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        {/* Weiches Ausblenden in den Kartenton statt einer Kante. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_35%,var(--color-sand)_100%)]" />
      </div>

      <div className="flex flex-1 flex-col p-10 pt-4 md:p-12 md:pt-6">
        <h3 className="text-2xl md:text-[1.75rem] font-bold leading-tight tracking-tight text-balance">
          {inventoryContent.headline}
        </h3>

        {/* Der Abstand sitzt am Container, nicht an jedem Absatz: `space-y-4`
            trennt die Absätze gleichmäßig, `mb-8` hält den Abstand zum Knopf.
            Ein `mt`/`mb` je Absatz würde beim zweiten Absatz doppelt zählen. */}
        <div className="mt-4 mb-8 space-y-4 leading-relaxed text-warm-muted">
          {inventoryContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        {/* `mt-auto` schiebt den Knopf an die Unterkante, damit er auf einer
            Linie mit dem Absendeknopf der Nachbarkarte sitzt. */}
        <Link
          href={inventoryContent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2.5 rounded-full border border-warm-ink/30 px-7 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors hover:border-warm-ink hover:bg-warm-ink hover:text-card"
        >
          {inventoryContent.ctaLabel}
          <Icon name="open_in_new" className="text-base" />
          <span className="sr-only">(öffnet in neuem Tab)</span>
        </Link>
      </div>
    </div>
  )
}
