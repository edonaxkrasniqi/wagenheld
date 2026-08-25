import type { InventoryContent } from '@/lib/types'

/**
 * Wortlaut aus dem Änderungswunsch des Kunden. Die früheren Formulierungen
 * „Unser aktueller Bestand liegt auf mobile.de" und „nicht eine Liste von
 * gestern" sind ersatzlos gestrichen und dürfen nicht zurückkehren.
 */
export const inventoryContent: InventoryContent = {
  label: 'Fahrzeugbestand',
  headline: 'Unsere aktuellen Fahrzeuge',
  paragraphs: [
    'Unser gesamtes Fahrzeugangebot finden Sie stets aktuell auf mobile.de – mit Bildern, Ausstattungsdetails, Fahrzeugdaten und Preisen.',
    'So haben Sie jederzeit einen aktuellen Überblick über alle verfügbaren Fahrzeuge.',
  ],
  ctaLabel: 'Fahrzeuge auf mobile.de ansehen',
  url: 'https://home.mobile.de/AUTOMOBILZENTRUMWAGENHELDGBR',
}
