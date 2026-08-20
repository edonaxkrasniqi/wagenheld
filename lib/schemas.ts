import { z } from 'zod'

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
  /**
   * Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Ohne aktives Häkchen wird
   * die Anfrage nicht verarbeitet — Vorab-Ankreuzen ist unzulässig.
   */
  consent: z.literal('on', {
    error: 'Bitte bestätigen Sie die Datenschutzhinweise',
  }),
})

export type SellingFormData = z.infer<typeof sellingFormSchema>
