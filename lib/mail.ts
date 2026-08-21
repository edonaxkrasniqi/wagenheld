import { Resend } from 'resend'
import type { BuyingFormData, SellingFormData } from '@/lib/schemas'
import { company } from '@/lib/site'

/**
 * Gemeinsamer Versandweg für beide Anfragearten.
 *
 * Die Formulardaten stehen bewusst nicht im Fehler-Log: das sind
 * personenbezogene Daten, und Server-Logs sind kein Ablageort dafür.
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
      'Einwilligung in die Datenschutzhinweise: erteilt',
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
    'Einwilligung in die Datenschutzhinweise: erteilt',
  ])
}
