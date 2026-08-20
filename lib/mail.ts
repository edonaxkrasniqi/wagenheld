import { Resend } from 'resend'
import type { SellingFormData } from '@/lib/schemas'
import { company } from '@/lib/site'

export async function sendSellingLead(data: SellingFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Bewusst ohne die Formulardaten im Log: das sind personenbezogene Daten
    // und Server-Logs sind kein Ablageort dafür.
    console.error(
      '[mail] RESEND_API_KEY ist nicht gesetzt — Ankauf-Anfrage wurde NICHT versendet.'
    )
    return false
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? 'Wagenheld Website <onboarding@resend.dev>',
    to: process.env.LEAD_TO_EMAIL ?? company.email,
    replyTo: data.email,
    subject: `Neue Ankauf-Anfrage: ${data.make} ${data.model} (EZ ${data.firstRegistration})`,
    text: [
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
    ].join('\n'),
  })

  if (error) {
    console.error('[mail] Resend-Versand fehlgeschlagen:', error)
    return false
  }

  return true
}
