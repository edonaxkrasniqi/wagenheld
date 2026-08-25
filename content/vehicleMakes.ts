/**
 * Auswahlliste für das Markenfeld im Ankauf-Formular.
 *
 * Der Kunde hat die Liste vorgegeben; sie ist bewusst kurz und deckt die
 * gängigen Marken ab, statt einen vollständigen Herstellerkatalog zu
 * simulieren. Wer eine Marke vermisst, wählt „Sonstige Marke" und trägt sie
 * frei ein — deshalb muss die Liste hier nicht gepflegt werden, um vollständig
 * zu sein.
 *
 * Sortierung: alphabetisch nach deutscher Kollation. „Škoda" steht deshalb
 * zwischen „Seat" und „Tesla" und nicht am Ende — Š zählt als S. Wer die Liste
 * erweitert, prüft die Reihenfolge mit dem Test in `tests/vehicleMakes.test.mjs`.
 */
export const vehicleMakes = [
  'Audi',
  'BMW',
  'Citroën',
  'Cupra',
  'Dacia',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Land Rover',
  'Mazda',
  'Mercedes-Benz',
  'Mini',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Seat',
  'Škoda',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
] as const

/**
 * Wert der Auswahl „Sonstige Marke".
 *
 * Er steht bewusst am Ende der Liste und nicht in der alphabetischen Reihe:
 * es ist keine Marke, sondern der Ausweg für alles, was nicht darin steht.
 *
 * Der Wert wird nie versendet — die Server-Validierung ersetzt ihn durch die
 * frei eingetragene Marke aus `makeOther`.
 */
export const otherVehicleMake = 'Sonstige Marke'

/** Alle wählbaren Werte des Feldes `make`, in der Reihenfolge des Dropdowns. */
export const vehicleMakeOptions = [...vehicleMakes, otherVehicleMake] as const

export type VehicleMakeOption = (typeof vehicleMakeOptions)[number]
