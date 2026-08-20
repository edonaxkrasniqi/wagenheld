import { Resend } from 'resend'
import type { SellingFormData } from '@/lib/schemas'
import { contactItems } from '@/content/about'

const dealerEmail =
  contactItems.find((item) => item.icon === 'mail')?.value ?? 'info@wagenheld.de'

export async function sendSellingLead(data: SellingFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error(
      '[mail] RESEND_API_KEY ist nicht gesetzt – Ankauf-Anfrage wurde NICHT per E-Mail versendet:',
      data
    )
    return false
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? 'Wagenheld Website <onboarding@resend.dev>',
    to: process.env.LEAD_TO_EMAIL ?? dealerEmail,
    replyTo: data.email,
    subject: `Neue Ankauf-Anfrage: ${data.make} ${data.model} (${data.year})`,
    text: [
      `Marke: ${data.make}`,
      `Modell: ${data.model}`,
      `Baujahr: ${data.year}`,
      `Kilometerstand: ${data.mileage} km`,
      '',
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone || '-'}`,
    ].join('\n'),
  })

  if (error) {
    console.error('[mail] Resend-Versand fehlgeschlagen:', error)
    return false
  }

  return true
}
