import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { InventoryPanel } from '@/components/sections/Inventory'
import { VehicleSellingForm } from '@/components/sections/VehicleSellingForm'

/**
 * Bestand und Anfrage als zwei große Karten auf warmem Off-White.
 *
 * Vorher war das eine schmale dunkle Box zwischen zwei hellen Abschnitten —
 * zu eng und zu hart. Jetzt trägt der Abschnitt selbst die helle Farbe, und
 * die beiden Wege stehen als gleichwertige Karten nebeneinander.
 *
 * Das Verhältnis 5:7 ist nicht Geschmack: das Formular braucht schlicht mehr
 * Platz als der Verweis auf mobile.de, und zwei gleich breite Spalten ließen
 * die linke leer auslaufen.
 */
export function InventoryAndSelling() {
  return (
    <section className="bg-warm text-warm-ink">
      <Reveal className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Ankauf &amp; Bestand</SectionLabel>
          <h2 className="mt-5 text-3xl md:text-[2.6rem] font-bold tracking-tight leading-[1.1] text-balance">
            Kaufen oder verkaufen. Beides einfach.
          </h2>
          <p className="mt-5 leading-relaxed text-warm-muted text-balance">
            Sehen Sie sich unseren aktuellen Bestand an oder lassen Sie Ihr
            Fahrzeug bewerten — unverbindlich und kostenlos.
          </p>
        </div>

        {/* 12 Spalten, aufgeteilt 5:7. `items-stretch` sorgt dafür, dass beide
            Karten gleich hoch sind, auch wenn das Formular länger ist. */}
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <InventoryPanel />
          </div>
          <div className="lg:col-span-7">
            <VehicleSellingForm />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
