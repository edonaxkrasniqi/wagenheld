import { Reveal } from '@/components/ui/Reveal'
import { InventoryPanel } from '@/components/sections/Inventory'
import { VehicleSellingForm } from '@/components/sections/VehicleSellingForm'

/**
 * Fahrzeugbestand und Ankauf-Formular nebeneinander in einem Abschnitt.
 *
 * Die beiden Sprungziele #fahrzeuge und #ankauf hängen weiterhin an je einer
 * Spalte, damit die Navigation unverändert funktioniert.
 */
export function InventoryAndSelling() {
  return (
    <section className="on-dark bg-anthracite">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <InventoryPanel />
        <VehicleSellingForm />
      </Reveal>
    </section>
  )
}
