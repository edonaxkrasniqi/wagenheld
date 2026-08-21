'use server'

import { buyingFormSchema, isFormIntent, sellingFormSchema } from '@/lib/schemas'
import { sendBuyingLead, sendSellingLead } from '@/lib/mail'
import type { FormState } from '@/lib/types'

const TRANSPORT_FAILED =
  'Ihre Anfrage konnte gerade nicht automatisch übermittelt werden. Bitte rufen Sie uns an oder schreiben Sie uns direkt eine E-Mail — Ihre Angaben gehen sonst verloren.'

export async function submitSellingForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: echte Besucher füllen dieses versteckte Feld nie aus, Bots oft.
  // Die Rückmeldung ist bewusst dieselbe wie im Erfolgsfall — wer automatisiert
  // absendet, soll nicht erfahren, woran es gelegen hat.
  if (formData.get('website')) {
    return { success: true, message: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.' }
  }

  const raw = Object.fromEntries(formData)

  // Welche der beiden Anfragen es ist, entscheidet der Server anhand des
  // mitgeschickten Feldes — nicht der Client. Ein unbekannter Wert wird als
  // Verkaufsanfrage behandelt, damit ein manipuliertes Feld nicht am
  // strengeren Schema vorbeiführt.
  const intent = isFormIntent(raw.intent) ? raw.intent : 'sell'

  if (intent === 'buy') {
    const parsed = buyingFormSchema.safeParse(raw)
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? 'Bitte überprüfen Sie Ihre Angaben.',
      }
    }

    if (!(await sendBuyingLead(parsed.data))) {
      return { success: false, message: TRANSPORT_FAILED }
    }

    return {
      success: true,
      message: `Vielen Dank, ${parsed.data.name}! Wir sehen uns um und melden uns bei Ihnen.`,
    }
  }

  const parsed = sellingFormSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? 'Bitte überprüfen Sie Ihre Angaben.',
    }
  }

  if (!(await sendSellingLead(parsed.data))) {
    return { success: false, message: TRANSPORT_FAILED }
  }

  return {
    success: true,
    message: `Vielen Dank, ${parsed.data.name}! Wir melden uns in Kürze bei Ihnen bezüglich Ihres ${parsed.data.make} ${parsed.data.model}.`,
  }
}
