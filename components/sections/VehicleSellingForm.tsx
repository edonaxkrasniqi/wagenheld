'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { submitSellingForm } from '@/lib/actions'
import {
  otherVehicleMake,
  vehicleMakeOptions,
  type VehicleMakeOption,
} from '@/content/vehicleMakes'
import type { FormIntent } from '@/lib/schemas'
import type { FormState } from '@/lib/types'

/**
 * Felder mindestens 52 px hoch — das ist die Größe, bei der ein Feld auf einem
 * Telefon zuverlässig mit dem Daumen zu treffen ist, und sie gibt dem Formular
 * die Ruhe, die es vorher nicht hatte.
 *
 * `text-base` (16 px) ist kein Geschmack: iOS Safari zoomt die ganze Seite,
 * sobald ein fokussiertes Feld kleiner gesetzt ist.
 *
 * Kein `outline-none` ohne Ersatz — die Rahmenfarbe allein ist kein
 * Fokusindikator. Der Ring kommt aus der globalen :focus-visible-Regel.
 *
 * Der Rahmen liegt bei 50 % Deckung und nicht bei den 15 %, die im Entwurf
 * angedeutet waren. WCAG 1.4.11 verlangt für die Begrenzung eines
 * Eingabefeldes 3:1 gegen den Untergrund; 15 % erreichen auf #fcfaf6 nur
 * 1,35:1, das Feld wäre für viele schlicht nicht als Feld erkennbar.
 * Wer den Wert senkt, muss neu rechnen.
 */
const inputClasses =
  'w-full min-h-[52px] bg-warm/60 border border-warm-ink/50 rounded-xl px-4 py-3.5 text-base text-warm-ink placeholder:text-warm-muted hover:border-warm-ink/70 focus:border-gold-ink aria-[invalid=true]:border-2 aria-[invalid=true]:border-red-700 transition-colors'

/**
 * Das Markenfeld ist ein natives <select>. Bewusst keine nachgebaute Combobox:
 * ein <select> ist per Tastatur, mit Screenreader und mit dem Rad-Picker auf
 * dem Telefon ohne eine Zeile JavaScript bedienbar — jeder Nachbau müsste
 * Rollen, Fokusfalle und Tastensteuerung selbst mitbringen und wäre dabei
 * bestenfalls gleich gut.
 *
 * `appearance-none` entfernt nur die Systemgrafik, nicht das Verhalten; der
 * Pfeil daneben ist ein `aria-hidden`-SVG und liegt auf `pointer-events-none`,
 * damit ein Klick darauf weiterhin die Liste öffnet. `pr-11` hält den Text
 * vom Pfeil frei.
 */
const selectClasses = `${inputClasses} appearance-none cursor-pointer pr-11`

const labelClasses =
  'block text-sm font-bold uppercase tracking-wide text-warm-muted mb-2'

const initialState: FormState = null

/** Pfeil des Markenfelds. Rein dekorativ — die Ansage macht das <select>. */
function SelectChevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Der Text ändert sich mit der Anfrageart, damit die Überschrift nicht dem
 * widerspricht, was darunter steht.
 */
const copy: Record<FormIntent, { headline: string; lead: string; submit: string }> = {
  sell: {
    headline: 'Wir nehmen Ihren Wagen in Zahlung',
    lead: 'Schicken Sie uns die Eckdaten. Wir melden uns mit einer Einschätzung zurück — unverbindlich und kostenlos.',
    submit: 'Kostenlos bewerten lassen',
  },
  buy: {
    headline: 'Sie suchen ein bestimmtes Fahrzeug?',
    lead: 'Beschreiben Sie einfach, wonach Sie suchen. Sie müssen sich noch auf nichts festlegen — wir melden uns und klären den Rest im Gespräch.',
    submit: 'Unverbindlich anfragen',
  },
}

export function VehicleSellingForm() {
  const [state, formAction, pending] = useActionState(submitSellingForm, initialState)
  const [intent, setIntent] = useState<FormIntent>('sell')
  // Leerer Startwert, damit die Auswahl eine bewusste Entscheidung bleibt und
  // `required` greift. Der Zustand steuert nur, ob das Freitextfeld erscheint.
  const [make, setMake] = useState<VehicleMakeOption | ''>('')
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  // Wer nach einem Fehler die Anfrageart wechselt, soll nicht mit den
  // Meldungen der anderen Ansicht weiterarbeiten. Zurückgesetzt wird das mit
  // der nächsten Antwort des Servers.
  const [dismissed, setDismissed] = useState(false)

  // Nach jeder Antwort des Servers wird das Formular neu aufgebaut (`key`),
  // damit die `defaultValue`s sicher greifen: nach einem Fehler stehen die
  // eingegebenen Werte wieder drin, nach dem Erfolg ist es leer. Angepasst
  // wird während des Renderns — Reacts vorgesehener Weg, auf einen geänderten
  // Wert zu reagieren, ohne einen zweiten Renderdurchlauf per Effekt.
  const [lastState, setLastState] = useState<FormState>(initialState)
  const [formKey, setFormKey] = useState(0)
  if (state !== lastState) {
    setLastState(state)
    setFormKey((key) => key + 1)
    setDismissed(false)
    // Die Antwort gehört zu der Anfrageart, die abgeschickt wurde — auch wenn
    // währenddessen umgeschaltet wurde.
    const echoedIntent = state?.values?.intent
    if (echoedIntent === 'sell' || echoedIntent === 'buy') setIntent(echoedIntent)
    const echoedMake = state?.success ? '' : (state?.values?.make ?? '')
    setMake(
      (vehicleMakeOptions as readonly string[]).includes(echoedMake)
        ? (echoedMake as VehicleMakeOption)
        : ''
    )
  }

  const values = state && !state.success ? (state.values ?? {}) : {}
  const errors = (!dismissed && state?.fieldErrors) || {}
  const statusMessage = state && !dismissed ? state.message : ''

  // Nach jeder Antwort einen definierten Fokus setzen. Das Formular wird per
  // `key` neu aufgebaut; der Absendeknopf, der den Fokus hatte, existiert
  // danach nicht mehr, und der Fokus fiele auf den Seitenkörper.
  //   – Mit Feldfehlern: aufs erste fehlerhafte Feld, die Meldung hängt dort.
  //   – Sonst (Erfolg, Versandfehler): auf die Statusmeldung.
  useEffect(() => {
    if (!state) return
    const invalidField = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    )
    if (invalidField) invalidField.focus()
    else statusRef.current?.focus()
  }, [state])

  const switchIntent = (value: FormIntent) => {
    setIntent(value)
    setDismissed(true)
  }

  /** Gemeinsame Attribute je Feld: Wert, Fehlerzustand, Beschreibungen. */
  const field = (name: string, hintId?: string) => {
    const errorId = errors[name] ? `${id}-${name}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    return {
      name,
      defaultValue: values[name],
      'aria-invalid': errors[name] ? (true as const) : undefined,
      'aria-describedby': describedBy,
    }
  }

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-sm font-semibold text-red-700">
        {errors[name]}
      </p>
    ) : null

  const text = copy[intent]
  const needsOtherMake = make === otherVehicleMake

  // Umschalter als zwei Knöpfe mit `aria-pressed`, nicht als Reiter-Muster:
  // ein halb umgesetztes Tab-Muster (ohne Pfeiltasten-Navigation und
  // wanderndem Tabindex) ist für Screenreader schlechter als zwei ehrliche
  // Schalter, die ansagen, ob sie gedrückt sind.
  const toggle = (value: FormIntent, label: string) => (
    <button
      type="button"
      onClick={() => switchIntent(value)}
      disabled={pending}
      aria-pressed={intent === value}
      className={`rounded-full px-3 py-3 text-[0.75rem] font-bold uppercase tracking-wider transition-colors ${
        intent === value
          ? 'bg-warm-ink text-card'
          : 'text-warm-muted hover:text-warm-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div
      id="ankauf"
      className="h-full scroll-mt-20 rounded-[24px] bg-card p-10 md:p-12"
    >
      <h3 className="text-2xl md:text-[1.75rem] font-bold leading-tight tracking-tight text-balance">
        {text.headline}
      </h3>
      <p className="mt-4 leading-relaxed text-warm-muted">{text.lead}</p>

      <div
        role="group"
        aria-label="Art der Anfrage"
        className="mt-7 mb-8 grid grid-cols-2 gap-1 rounded-full border border-warm-ink/50 bg-warm/60 p-1"
      >
        {toggle('sell', 'Ich möchte verkaufen')}
        {toggle('buy', 'Ich möchte kaufen')}
      </div>

      <form
        key={formKey}
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Honeypot: echte Besucher sehen und füllen dieses Feld nie. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {/* Der Server entscheidet anhand dieses Feldes, welches Schema greift. */}
        <input type="hidden" name="intent" value={intent} />

        {intent === 'sell' ? (
          <>
            {/*
              Auswahl und Freitext stehen zusammen in einer Rasterzelle. Ein
              eigenes Feld daneben hätte das Zwei-Spalten-Raster bei jedem
              Einblenden umgeworfen und weiter unten eine halbe Zelle leer
              gelassen; so bleibt die Anordnung in beiden Zuständen dieselbe.
            */}
            <div>
              <label htmlFor={`${id}-make`} className={labelClasses}>
                Marke
              </label>
              <div className="relative">
                <select
                  id={`${id}-make`}
                  {...field('make')}
                  required
                  defaultValue={make}
                  onChange={(event) =>
                    setMake(event.target.value as VehicleMakeOption | '')
                  }
                  className={selectClasses}
                >
                  {/* `value=""` plus `required` lässt das Formular nicht
                      abschicken, solange nichts gewählt wurde. */}
                  <option value="" disabled>
                    Bitte auswählen
                  </option>
                  {vehicleMakeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              {fieldError('make')}

              {/*
                Nur im Bedarfsfall im DOM — und damit auch nur dann im
                abgeschickten FormData. Der Server prüft dieselbe Bedingung
                noch einmal, das Ausblenden allein ist keine Validierung.
              */}
              {needsOtherMake && (
                <div className="mt-4">
                  <label htmlFor={`${id}-make-other`} className={labelClasses}>
                    Marke angeben
                  </label>
                  <input
                    id={`${id}-make-other`}
                    {...field('makeOther')}
                    required
                    maxLength={60}
                    autoComplete="off"
                    placeholder="z. B. Alfa Romeo"
                    className={inputClasses}
                  />
                  {fieldError('makeOther')}
                </div>
              )}
            </div>

            <div>
              <label htmlFor={`${id}-model`} className={labelClasses}>
                Modell
              </label>
              <input
                id={`${id}-model`}
                {...field('model')}
                required
                maxLength={80}
                autoComplete="off"
                placeholder="z. B. Golf VII"
                className={inputClasses}
              />
              {fieldError('model')}
            </div>

            {/*
              Erstzulassung tagesgenau statt Baujahr — Kundenanforderung aus
              Trello-Karte #31. Bewusst ein Textfeld mit klarem Format statt
              type="date", weil ältere Fahrzeugscheine oft nur TT.MM.JJJJ
              hergeben und der Nutzer das direkt abtippen kann.
            */}
            <div>
              <label htmlFor={`${id}-ez`} className={labelClasses}>
                Erstzulassung
              </label>
              <input
                id={`${id}-ez`}
                {...field('firstRegistration', `${id}-ez-hint`)}
                required
                inputMode="numeric"
                placeholder="TT.MM.JJJJ"
                pattern="\d{2}\.\d{2}\.\d{4}"
                title="Bitte als TT.MM.JJJJ angeben, z. B. 01.03.2018"
                className={inputClasses}
              />
              <p id={`${id}-ez-hint`} className="mt-2 text-sm text-warm-muted">
                Steht im Fahrzeugschein unter Punkt B.
              </p>
              {fieldError('firstRegistration')}
            </div>

            <div>
              <label htmlFor={`${id}-mileage`} className={labelClasses}>
                Kilometerstand
              </label>
              <input
                id={`${id}-mileage`}
                {...field('mileage')}
                type="number"
                min="1"
                max="2000000"
                required
                inputMode="numeric"
                placeholder="z. B. 128000"
                className={inputClasses}
              />
              {fieldError('mileage')}
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className={labelClasses}>
              Wonach suchen Sie?
            </label>
            <textarea
              id={`${id}-message`}
              {...field('message', `${id}-message-hint`)}
              required
              maxLength={2000}
              rows={5}
              placeholder="z. B. Kombi, Automatik, bis 20.000 € — oder einfach, was Ihnen wichtig ist."
              className={`${inputClasses} resize-y`}
            />
            <p id={`${id}-message-hint`} className="mt-2 text-sm text-warm-muted">
              Sie müssen sich noch nicht festlegen. Ein paar Stichworte genügen.
            </p>
            {fieldError('message')}
          </div>
        )}

        <div>
          <label htmlFor={`${id}-name`} className={labelClasses}>
            Ihr Name
          </label>
          <input
            id={`${id}-name`}
            {...field('name')}
            required
            maxLength={100}
            autoComplete="name"
            className={inputClasses}
          />
          {fieldError('name')}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelClasses}>
            E-Mail-Adresse
          </label>
          <input
            id={`${id}-email`}
            {...field('email')}
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClasses}
          />
          {fieldError('email')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className={labelClasses}>
            Telefon <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            {...field('phone')}
            type="tel"
            maxLength={40}
            autoComplete="tel"
            className={inputClasses}
          />
          {fieldError('phone')}
        </div>

        {intent === 'sell' && (
          /*
            Kein Fahrzeugschein-Upload. Der Kunde wollte den Schein
            mitgeschickt bekommen (Trello #19) — ein Upload würde aber
            Ausweis- und Halterdaten auf dem Server ablegen und damit
            Rechtsgrundlage, Verschlüsselung, Speicherort und Löschfrist nach
            sich ziehen. Auch die frühere Aufforderung, den Schein per E-Mail
            nachzuschicken, ist entfallen: unverschlüsselte E-Mail ist für
            Halterdaten der falsche Kanal, und die Datenschutzerklärung
            (Abschnitt 5) rät genau davon ab. Beide Stellen müssen dasselbe
            sagen.
          */
          <p className="sm:col-span-2 text-sm text-warm-muted leading-relaxed">
            Den Fahrzeugschein brauchen wir für die erste Einschätzung nicht.
            Sollten wir Unterlagen benötigen, sprechen wir Sie an und stimmen
            einen sicheren Weg ab. Bitte laden Sie keine Ausweisdokumente hoch.
          </p>
        )}

        <div className="sm:col-span-2 flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            defaultChecked={values.consent === 'on'}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-warm-ink"
          />
          <div>
            <label htmlFor={`${id}-consent`} className="text-sm text-warm-muted leading-relaxed">
              Ich habe die{' '}
              <Link href="/datenschutz" className="text-gold-ink underline underline-offset-2 hover:no-underline">
                Datenschutzerklärung
              </Link>{' '}
              zur Kenntnis genommen.
            </label>
            {fieldError('consent')}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="sm:col-span-2 mt-3 min-h-[56px] rounded-xl bg-warm-ink px-8 text-sm font-bold uppercase tracking-wider text-card transition-colors hover:bg-warm-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Wird gesendet…' : text.submit}
        </button>
      </form>

      {/*
        Statusmeldung bewusst AUSSERHALB des Formulars: das wird nach jeder
        Antwort per `key` neu aufgebaut. Eine Live-Region, die schon mit Text
        neu entsteht, sagen viele Screenreader nicht an — diese hier bleibt
        dauerhaft im DOM und ändert nur ihren Inhalt.
      */}
      <p
        ref={statusRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={`mt-4 text-sm font-semibold outline-none ${
          state?.success ? 'text-gold-ink' : 'text-red-700'
        }`}
      >
        {statusMessage}
      </p>
    </div>
  )
}
