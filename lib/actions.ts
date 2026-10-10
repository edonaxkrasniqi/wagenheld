'use server'

import { buyingFormSchema, isFormIntent, sellingFormSchema } from '@/lib/schemas'
import { sendBuyingLead, sendSellingLead } from '@/lib/mail'
import type { FormState } from '@/lib/types'
import type { ZodError } from 'zod'

const TRANSPORT_FAILED =
  'Ihre Anfrage konnte gerade nicht automatisch übermittelt werden. Bitte rufen Sie uns an oder schreiben Sie uns direkt eine E-Mail — Ihre Angaben gehen sonst verloren.'

const INVALID = 'Bitte prüfen Sie die markierten Felder.'

/** Felder, deren Inhalt nach einem Fehler wieder ins Formular zurückgeht. */
const echoedFields = [
  'make',
  'makeOther',
  'model',
  'firstRegistration',
  'mileage',
  'message',
  'name',
  'email',
  'phone',
  'consent',
] as const

function echoValues(raw: Record<string, FormDataEntryValue>): Record<string, string> {
  const values: Record<string, string> = {}
  for (const field of echoedFields) {
    const value = raw[field]
    // Nur Text zurückgeben, nie Dateien — und begrenzt, damit ein
    // manipulierter POST nicht beliebig viel Text in die Antwort spiegelt.
    if (typeof value === 'string') values[field] = value.slice(0, 2000)
  }
  return values
}

/** Erste Meldung je Feld; Fehler ohne Feldbezug landen in der Sammelmeldung. */
function toFieldErrors(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !fieldErrors[field]) {
      fieldErrors[field] = issue.message
    }
  }
  return fieldErrors
}

function invalid(error: ZodError, raw: Record<string, FormDataEntryValue>): FormState {
  const fieldErrors = toFieldErrors(error)
  return {
    success: false,
    message: Object.keys(fieldErrors).length
      ? INVALID
      : (error.issues[0]?.message ?? 'Bitte überprüfen Sie Ihre Angaben.'),
    fieldErrors,
    values: echoValues(raw),
  }
}

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
    if (!parsed.success) return invalid(parsed.error, raw)

    if (!(await sendBuyingLead(parsed.data))) {
      return { success: false, message: TRANSPORT_FAILED, values: echoValues(raw) }
    }

    return {
      success: true,
      message: `Vielen Dank, ${parsed.data.name}! Wir sehen uns um und melden uns bei Ihnen.`,
    }
  }

  const parsed = sellingFormSchema.safeParse(raw)
  if (!parsed.success) return invalid(parsed.error, raw)

  if (!(await sendSellingLead(parsed.data))) {
    return { success: false, message: TRANSPORT_FAILED, values: echoValues(raw) }
  }

  return {
    success: true,
    message: `Vielen Dank, ${parsed.data.name}! Wir melden uns in Kürze bei Ihnen bezüglich Ihres ${parsed.data.make} ${parsed.data.model}.`,
  }
}
