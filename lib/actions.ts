'use server'

import { sellingFormSchema } from '@/lib/schemas'
import { sendSellingLead } from '@/lib/mail'
import type { FormState } from '@/lib/types'

export async function submitSellingForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: real visitors never fill this hidden field, bots often do.
  if (formData.get('website')) {
    return {
      success: true,
      message: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    }
  }

  const raw = Object.fromEntries(formData)
  const parsed = sellingFormSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? 'Bitte überprüfen Sie Ihre Angaben.',
    }
  }

  const sent = await sendSellingLead(parsed.data)

  if (!sent) {
    return {
      success: false,
      message:
        'Ihre Anfrage konnte gerade nicht automatisch übermittelt werden. Bitte rufen Sie uns an oder schreiben Sie uns direkt eine E-Mail — Ihre Angaben gehen sonst verloren.',
    }
  }

  return {
    success: true,
    message: `Vielen Dank, ${parsed.data.name}! Wir melden uns in Kürze bei Ihnen bezüglich Ihres ${parsed.data.make} ${parsed.data.model}.`,
  }
}
