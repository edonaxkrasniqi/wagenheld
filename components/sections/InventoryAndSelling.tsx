import { Reveal } from '@/components/ui/Reveal'
import { InventoryPanel } from '@/components/sections/Inventory'
import { VehicleSellingForm } from '@/components/sections/VehicleSellingForm'

/**
 * Bestand und Anfrage als zwei Felder einer gemeinsamen dunklen Karte auf
 * hellem Grund.
 *
 * Die Karte statt einer randlos dunklen Bahn: darunter folgt der helle
 * "Über uns"-Abschnitt, und ohne Rahmen entstand dort eine harte Kante mitten
 * im Scrollverlauf.
 *
 * Die Spalten sind ungleich breit — das Formular braucht mehr Platz als der
 * Verweis auf mobile.de, und zwei gleich breite Spalten ließen die linke leer
 * auslaufen.
 *
 * `on-dark` bleibt an der Karte, damit der Fokusring darin die helle Variante
 * benutzt; der dunkle Ring wäre auf dunklem Grund unsichtbar.
 */
export function InventoryAndSelling() {
  return (
    <section className="bg-background">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="on-dark grid grid-cols-1 overflow-hidden rounded-lg bg-anthracite lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          <InventoryPanel />
          <div className="border-t border-white/10 px-6 py-10 md:px-10 md:py-12 lg:border-t-0 lg:border-l">
            <VehicleSellingForm />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
