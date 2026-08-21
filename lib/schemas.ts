import { z } from 'zod'

/**
 * Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Ohne aktives Häkchen wird die
 * Anfrage nicht verarbeitet — Vorab-Ankreuzen ist unzulässig. Steht in beiden
 * Formularen, weil in beiden personenbezogene Daten übermittelt werden.
 */
const consentSchema = z.literal('on', {
  error: 'Bitte bestätigen Sie die Datenschutzhinweise',
})

/**
 * Erstzulassung statt Baujahr — Kundenanforderung aus Trello-Karte #31.
 * Erfasst wird ein Datum (TT.MM.JJJJ), nicht nur ein Jahr.
 */
const firstRegistrationSchema = z
  .string()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Erstzulassung bitte als TT.MM.JJJJ angeben')
  .refine((value) => {
    const [day, month, year] = value.split('.').map(Number)
    const date = new Date(year, month - 1, day)
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      year >= 1900 &&
      date.getTime() <= Date.now()
    )
  }, 'Bitte ein gültiges Datum angeben, das nicht in der Zukunft liegt')

/** Wer ein Fahrzeug anbietet, liefert die Eckdaten mit. */
export const sellingFormSchema = z.object({
  make: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  firstRegistration: firstRegistrationSchema,
  mileage: z.coerce
    .number({ error: 'Kilometerstand muss eine Zahl sein' })
    .int()
    .positive('Kilometerstand muss positiv sein')
    .max(2_000_000, 'Bitte den Kilometerstand prüfen'),
  name: z.string().min(2, 'Name ist erforderlich'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().max(40).optional(),
  consent: consentSchema,
})

/**
 * Wer ein Fahrzeug sucht, soll möglichst wenig ausfüllen müssen.
 *
 * Bewusst nur Freitext und Kontaktweg: Wer unsicher ist, was er sucht, bricht
 * an einem Pflichtfeld "Erstzulassung" ab. Ein Satz und eine Rückrufnummer
 * genügen, um ins Gespräch zu kommen — alles Weitere klärt der Anruf.
 */
export const buyingFormSchema = z.object({
  message: z
    .string()
    .trim()
    .min(10, 'Bitte beschreiben Sie kurz, wonach Sie suchen')
    .max(2000, 'Bitte fassen Sie sich etwas kürzer'),
  name: z.string().min(2, 'Name ist erforderlich'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().max(40).optional(),
  consent: consentSchema,
})

export type SellingFormData = z.infer<typeof sellingFormSchema>
export type BuyingFormData = z.infer<typeof buyingFormSchema>

/** Welche der beiden Anfragen abgeschickt wurde. */
export const formIntents = ['sell', 'buy'] as const
export type FormIntent = (typeof formIntents)[number]

export function isFormIntent(value: unknown): value is FormIntent {
  return typeof value === 'string' && (formIntents as readonly string[]).includes(value)
}
