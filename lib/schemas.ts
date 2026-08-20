import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const sellingFormSchema = z.object({
  make: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  year: z.coerce
    .number({ error: 'Baujahr muss eine Zahl sein' })
    .int()
    .min(1900, 'Ungültiges Baujahr')
    .max(currentYear + 1, 'Ungültiges Baujahr'),
  mileage: z.coerce
    .number({ error: 'Kilometerstand muss eine Zahl sein' })
    .positive('Kilometerstand muss positiv sein'),
  name: z.string().min(2, 'Name ist erforderlich'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().optional(),
})

export type SellingFormData = z.infer<typeof sellingFormSchema>
