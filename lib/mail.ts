import { Resend } from 'resend'
import type { BuyingFormData, SellingFormData } from '@/lib/schemas'
import { company } from '@/lib/site'

/**
 * Gemeinsamer Versandweg für beide Anfragearten.
 *
 * Die Formulardaten stehen bewusst nicht im Fehler-Log: das sind
 * personenbezogene Daten, und Server-Logs sind kein Ablageort dafür.
 *
 * LÖSCHFRIST — bitte beim Ändern beachten: Anfragen werden hier nur versendet,
 * nicht gespeichert. Es gibt keine Datenbank, keine Datei und keinen Cache, in
 * dem sie liegen bleiben. Die in der Datenschutzerklärung zugesagte Frist von
 * sechs Monaten kann deshalb technisch gar nicht hier durchgesetzt werden; sie
 * gilt für das Postfach `info@…` und muss dort organisatorisch eingehalten
 * werden (siehe GO-LIVE.md, Abschnitt B2).
 *
 * Wer hier später eine Persistenz ergänzt — eine Datenbank, ein Ticketsystem,
 * ein Log mit Inhalt —, muss zugleich eine automatische Löschung nach
 * spätestens sechs Monaten mitliefern. Sonst steht die Zusage in der
 * Datenschutzerklärung ohne Deckung da.
 */
async function send(subject: string, replyTo: string, lines: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error(
      `[mail] RESEND_API_KEY ist nicht gesetzt — Anfrage wurde NICHT versendet (${subject}).`
    )
    return false
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? 'Wagenheld Website <onboarding@resend.dev>',
    to: process.env.LEAD_TO_EMAIL ?? company.email,
    replyTo,
    subject,
    text: lines.join('\n'),
  })

  if (error) {
    console.error('[mail] Resend-Versand fehlgeschlagen:', error)
    return false
  }

  return true
}

/** Jemand bietet uns ein Fahrzeug an. */
export function sendSellingLead(data: SellingFormData): Promise<boolean> {
  return send(
    `Neue Ankauf-Anfrage: ${data.make} ${data.model} (EZ ${data.firstRegistration})`,
    data.email,
    [
      `Marke: ${data.make}`,
      `Modell: ${data.model}`,
      `Erstzulassung: ${data.firstRegistration}`,
      `Kilometerstand: ${data.mileage.toLocaleString('de-DE')} km`,
      '',
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone || '-'}`,
      '',
      'Datenschutzhinweise: zur Kenntnis genommen',
    ]
  )
}

/** Jemand sucht ein Fahrzeug und beschreibt es im Freitext. */
export function sendBuyingLead(data: BuyingFormData): Promise<boolean> {
  return send(`Neue Kaufanfrage von ${data.name}`, data.email, [
    'Gesucht wird:',
    data.message,
    '',
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || '-'}`,
    '',
    'Datenschutzhinweise: zur Kenntnis genommen',
  ])
}
