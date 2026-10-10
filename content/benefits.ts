import type { Benefit } from '@/lib/types'
import { company } from '@/lib/site'

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
 * Sechs Kacheln im Kundenwortlaut vom 17.08.
 *
 * Der Kunde hat die Formulierungen selbst festgelegt. Zwischenzeitlich waren
 * "Wartung" und "Inzahlungnahme" gestrichen, damit die Reihe in eine Zeile
 * passt; mit dem Streifen-Layout passen alle sechs nebeneinander, deshalb
 * stehen sie wieder drin. Sechs Kacheln entsprechen auch dem
 * Akzeptanzkriterium aus CR-05. Zwei Punkte zum Wortlaut:
 *
 * - "GEPRÜFT / Umfassender Fahrzeugcheck" löst die alte Rohdaten-Karte
 *   "Technisch geprüft bei geprüft" auf. Bewusst ohne Nennung von DEKRA, TÜV
 *   oder einer Meisterwerkstatt: ein Prüfsiegel ohne Deckung ist nach § 5 UWG
 *   angreifbar, und der Kunde hat kein konkretes Siegel benannt.
 * - "ZULASSUNG" bleibt hier stehen, obwohl die Änderungsanforderung CR-05
 *   vorschlug, sie in einen eigenen Service-Abschnitt zu verschieben. Der
 *   Kunde hat die sechs Punkte als eine Reihe geliefert, und Kundenwortlaut
 *   hat Vorrang. Die geforderte Zahl von sechs Kacheln stimmt so ohnehin.
 *
 * Weiterhin bewusst nicht enthalten: konkrete Zinssätze (§ 6a PAngV),
 * "Bestpreis-Garantie" und "Zulassung deutschlandweit".
 */
export const benefits: Benefit[] = [
  {
    icon: 'verified',
    headline: 'Geprüft',
    description: 'Umfassender Fahrzeugcheck',
  },
  {
    icon: 'handyman',
    headline: 'Wartung',
    description: 'Aktuelle Inspektion nach Herstellervorgabe',
  },
  {
    icon: 'payments',
    headline: 'Finanzierung',
    // Kachelüberschrift und Beschreibung ergeben zusammen den vom Kunden
    // vorgegebenen Satz: „Finanzierung über unsere Partnerbank Bank11
    // möglich." Das frühere „Individuell möglich" war inhaltsleer und ließ
    // offen, wer eigentlich finanziert.
    //
    // Mehr steht hier bewusst nicht: Wagenheld ist weder Bank noch eigener
    // Kreditgeber. Aussagen über eine eigene Vermittlungserlaubnis, eine
    // Aufsichtsbehörde oder § 34c GewO sind nicht belegt und gehören deshalb
    // nicht auf die Seite. Konkrete Zinssätze ebenfalls nicht — § 6a PAngV.
    description: `Über unsere Partnerbank ${company.financePartnerBank} möglich`,
  },
  {
    // Schild statt Richterhammer — `gavel` stand für Recht, nicht für Schutz.
    icon: 'shield',
    headline: 'Garantie',
    // Garantiegeber, Deckungsumfang und Kosten liegen nicht vor. Deshalb steht
    // die Laufzeit als *optionale Verlängerung* da, mit ausdrücklichem Verweis
    // auf die Bedingungen — keine pauschale Zusage. Sobald die Bedingungen
    // vorliegen, gehören Garantiegeber und Umfang hierher (§ 479 BGB; im
    // Kaufvertrag sind sie ohnehin Pflicht).
    description: 'Garantieverlängerung optional bis 36 Monate – Bedingungen auf Anfrage',
  },
  {
    icon: 'handshake',
    headline: 'Inzahlungnahme',
    description: 'Faire Bewertung',
  },
  {
    icon: 'directions_car',
    headline: 'Zulassung',
    description: 'Zulassungsservice im Raum Karlsruhe',
  },
]
