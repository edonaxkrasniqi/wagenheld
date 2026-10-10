import { z } from 'zod'
import { otherVehicleMake, vehicleMakeOptions } from '@/content/vehicleMakes'

/**
 * Bestätigung der Kenntnisnahme — bewusst KEINE Einwilligung nach Art. 6
 * Abs. 1 lit. a DSGVO.
 *
 * Wer ein Fahrzeug anbietet oder sucht, will einen Vertrag anbahnen. Dafür
 * trägt Art. 6 Abs. 1 lit. b DSGVO die Verarbeitung von sich aus; eine
 * Einwilligung wäre daneben überflüssig. Schlimmer: Eine Einwilligung muss
 * nach Art. 7 Abs. 4 DSGVO freiwillig sein. Ein Pflichthäkchen, ohne das das
 * Formular nicht absendet, ist das nicht — die „Einwilligung" wäre unwirksam
 * und der Widerruf liefe ins Leere, weil lit. b weiterträgt.
 *
 * Das Häkchen bleibt trotzdem: Es dokumentiert, dass die Hinweise nach Art. 13
 * DSGVO zur Kenntnis genommen wurden. Vorab-Ankreuzen bleibt unzulässig.
 *
 * Wer den Text hier ändert, ändert ihn auch in
 * `components/sections/VehicleSellingForm.tsx` und in `lib/mail.ts`. Die
 * Datenschutzerklärung (Kanzlei-Text, Ziffer 3.2) nennt für Formulare lit. f
 * und ergänzend lit. b — das passt zu dieser Einordnung.
 */
const consentSchema = z.literal('on', {
  error: 'Bitte bestätigen Sie die Datenschutzhinweise',
})
/**
 * Obergrenzen für die Kontaktfelder.
 *
 * `maxlength` im Markup ist eine Bequemlichkeit für den Browser, keine
 * Kontrolle: Ein direkt abgesetzter POST kennt das Attribut nicht. Ohne
 * Obergrenze könnte jemand ein Megabyte Text in den Betreff der Mail schieben.
 * Die Werte sind großzügig genug, dass sie niemanden echten treffen.
 */
/**
 * Einzeilige Felder dürfen keinen Zeilenumbruch enthalten. Name und Modell
 * landen im Betreff der Benachrichtigungs-Mail; ein per manipuliertem POST
 * eingeschleustes CR/LF hätte dort nichts verloren — egal, ob der Versand-
 * dienst es abfängt.
 */
const singleLine = /^[^\r\n]*$/
const SINGLE_LINE_MESSAGE = 'Bitte ohne Zeilenumbruch angeben'

const nameSchema = z
  .string()
  .trim()
  .min(1, 'Bitte geben Sie Ihren Namen an')
  .min(2, 'Bitte den vollständigen Namen angeben')
  .max(100, 'Bitte den Namen kürzer angeben')
  .regex(singleLine, SINGLE_LINE_MESSAGE)

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse an')
  .max(254, 'Die E-Mail-Adresse ist zu lang')
  .email('Bitte eine gültige E-Mail-Adresse angeben, z. B. name@beispiel.de')

const phoneSchema = z
  .string()
  .trim()
  .max(40, 'Bitte die Telefonnummer kürzer angeben')
  .regex(singleLine, SINGLE_LINE_MESSAGE)
  .optional()


/**
 * Erstzulassung statt Baujahr — Kundenanforderung aus Trello-Karte #31.
 * Erfasst wird ein Datum (TT.MM.JJJJ), nicht nur ein Jahr.
 */
const firstRegistrationSchema = z
  .string()
  .trim()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Erstzulassung bitte als TT.MM.JJJJ angeben')
  // Zwei getrennte Prüfungen, damit die Meldung sagt, was wirklich falsch
  // ist: „31.02.2018" gibt es nicht — das ist kein Datum „in der Zukunft".
  .refine((value) => {
    const [day, month, year] = value.split('.').map(Number)
    const date = new Date(year, month - 1, day)
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      year >= 1900
    )
  }, 'Dieses Datum gibt es nicht — bitte prüfen')
  .refine((value) => {
    const [day, month, year] = value.split('.').map(Number)
    return new Date(year, month - 1, day).getTime() <= Date.now()
  }, 'Die Erstzulassung kann nicht in der Zukunft liegen')

/**
 * Die Marke kommt aus einem Dropdown, deshalb `z.enum` statt Freitext: der
 * Server akzeptiert genau die Werte, die das Formular anbietet. Ein
 * manipuliertes Feld fällt damit durch, statt ungeprüft in die E-Mail zu
 * wandern.
 */
const makeSchema = z.enum(vehicleMakeOptions, {
  error: 'Bitte wählen Sie eine Marke aus',
})

/**
 * Freitext-Marke. Nur ausgefüllt, wenn im Dropdown „Sonstige Marke" steht —
 * das Formular blendet das Feld sonst gar nicht erst ein, also darf es hier
 * fehlen dürfen. Ob es fehlen *darf*, entscheidet die Prüfung unten.
 */
const otherMakeSchema = z
  .string()
  .trim()
  .max(60, 'Bitte die Marke etwas kürzer angeben')
  .regex(singleLine, SINGLE_LINE_MESSAGE)
  .optional()

/** Wer ein Fahrzeug anbietet, liefert die Eckdaten mit. */
export const sellingFormSchema = z
  .object({
    make: makeSchema,
    makeOther: otherMakeSchema,
    model: z
      .string()
      .trim()
      .min(1, 'Bitte geben Sie das Modell an')
      .max(80, 'Bitte das Modell kürzer angeben')
      .regex(singleLine, SINGLE_LINE_MESSAGE),
    firstRegistration: firstRegistrationSchema,
    // Leeres Feld zuerst abfangen: `z.coerce` machte aus "" die Zahl 0 und
    // meldete dann „muss positiv sein" — für ein leeres Feld irreführend.
    mileage: z
      .string()
      .trim()
      .min(1, 'Bitte geben Sie den Kilometerstand an')
      .pipe(
        z.coerce
          .number<string>({ error: 'Bitte nur Ziffern angeben, z. B. 128000' })
          .int('Bitte ganze Kilometer angeben')
          .positive('Der Kilometerstand muss größer als 0 sein')
          .max(2_000_000, 'Bitte den Kilometerstand prüfen')
      ),
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    consent: consentSchema,
  })
  .superRefine((data, ctx) => {
    if (data.make !== otherVehicleMake) return

    if (!data.makeOther) {
      ctx.addIssue({
        code: 'custom',
        path: ['makeOther'],
        message: 'Bitte geben Sie die Marke an',
      })
    }
  })
  /*
    Nach außen bleibt es bei einem einzigen Feld `make`. „Sonstige Marke" ist
    ein Auswahlwert, keine Marke — er wird hier durch die frei eingetragene
    ersetzt und taucht deshalb weder in der E-Mail noch in der Bestätigung auf.
    Das hält lib/mail.ts unverändert kompatibel.
  */
  .transform(({ makeOther, ...rest }) => ({
    ...rest,
    make: rest.make === otherVehicleMake && makeOther ? makeOther : rest.make,
  }))

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
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
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
