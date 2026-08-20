import type { Benefit } from '@/lib/types'

/**
 * WICHTIG: public/fonts/material-symbols-outlined.woff2 ist ein Subset. Es
 * enthaelt nur die Symbole, die beim Erstellen ausgewaehlt wurden. Ein Name,
 * der nicht im Subset steckt, wird vom Browser als roher Text ausgegeben —
 * auf der Seite stand dann woertlich "workspace_premium". Neue Symbolnamen
 * deshalb immer erst im Browser pruefen oder das Subset neu erzeugen.
 *
 * Aktuell verfuegbar: verified, history, payments, gavel, handshake,
 * local_shipping, call, mail, location_on, schedule, home, directions_car,
 * sell, handyman, info, contact_support, menu, close, open_in_new, star.
 */

/**
 * Wortlaut aus den Kundenkarten #12–18 und #21, redaktionell geglättet.
 *
 * Bewusst entschärft gegenüber dem alten Stand:
 * - "Ab 1,99 % Zinsen" ist ersatzlos raus. Eine konkrete Zinsangabe löst nach
 *   § 6a PAngV die Pflicht zu einem repräsentativen Beispiel aus (effektiver
 *   Jahreszins, Nettodarlehensbetrag, Laufzeit, Gesamtbetrag). Der Kunde hat
 *   nur "Finanzierung individuell möglich" gesagt.
 * - "Bestpreis-Garantie" ist raus. Der Kunde sagte "fairer Preis".
 * - Garantie steht jetzt bei den vom Kunden genannten 36 Monaten, ausdrücklich
 *   als optional. OFFEN (Ari): Bedingungen und Garantiegeber fehlen noch.
 * - "Zulassung deutschlandweit" ist raus. Der Kunde sagte "Raum Karlsruhe".
 */
export const benefits: Benefit[] = [
  {
    icon: 'verified',
    headline: 'Über 10 Jahre',
    description: 'Erfahrung im Gebrauchtwagenhandel',
  },
  {
    // OFFEN (Ari): Kundenkarte #13 lautet "Technisch geprüft bei geprüft".
    // Solange nicht feststeht, ob DEKRA, TÜV oder eigene Werkstatt gemeint
    // ist, bleibt es bei der neutralen Formulierung. Eine Prüfsiegel-Aussage
    // ohne Deckung ist nach § 5 UWG angreifbar.
    icon: 'handyman',
    headline: 'Sorgfältig ausgewählt',
    description: 'Jedes Fahrzeug wird vor dem Verkauf durchgesehen',
  },
  {
    icon: 'history',
    headline: 'Wartungshistorie',
    description: 'Auf Wunsch einsehbar',
  },
  {
    icon: 'payments',
    headline: 'Finanzierung',
    description: 'Individuell möglich',
  },
  {
    icon: 'gavel',
    headline: 'Garantie',
    description: 'Optional bis zu 36 Monate',
  },
  {
    icon: 'handshake',
    headline: 'Inzahlungnahme',
    description: 'Zu einem fairen Preis',
  },
  {
    icon: 'local_shipping',
    headline: 'Zulassung',
    description: 'Im Raum Karlsruhe',
  },
  {
    icon: 'contact_support',
    headline: 'Persönlich',
    description: 'Beratung vor Ort in Bruchsal',
  },
]
