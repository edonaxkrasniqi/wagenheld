import { Reveal } from '@/components/ui/Reveal'
import { InventoryPanel } from '@/components/sections/Inventory'
import { VehicleSellingForm } from '@/components/sections/VehicleSellingForm'

/**
 * Fahrzeugbestand und Anfrageformular nebeneinander in einer dunklen Box auf
 * hellem Grund.
 *
 * Die Box statt einer randlos dunklen Bahn: darunter folgt der helle
 * "Über uns"-Abschnitt, und ohne Rahmen entstand dort eine harte Kante
 * mitten im Scrollverlauf. Der helle Grund ringsum fängt den Wechsel ab,
 * statt ihn als Bruch zu zeigen.
 *
 * `on-dark` bleibt an der Box, damit der Fokusring darin die helle Variante
 * benutzt — auf dem dunklen Grund wäre der dunkle Ring unsichtbar.
 */
export function InventoryAndSelling() {
  return (
    <section className="bg-background">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="on-dark bg-anthracite rounded-lg px-6 py-12 md:px-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <InventoryPanel />
            <VehicleSellingForm />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
