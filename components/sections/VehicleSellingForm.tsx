'use client'

import { useActionState, useId, useState } from 'react'
import Link from 'next/link'
import { submitSellingForm } from '@/lib/actions'
import { company } from '@/lib/site'
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
  'w-full min-h-[52px] bg-warm/60 border border-warm-ink/50 rounded-xl px-4 py-3.5 text-base text-warm-ink placeholder:text-warm-muted hover:border-warm-ink/70 focus:border-gold-ink transition-colors'

const labelClasses =
  'block text-sm font-bold uppercase tracking-wide text-warm-muted mb-2'

const initialState: FormState = null

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
  const id = useId()

  const text = copy[intent]

  // Umschalter als zwei Knöpfe mit `aria-pressed`, nicht als Reiter-Muster:
  // ein halb umgesetztes Tab-Muster (ohne Pfeiltasten-Navigation und
  // wanderndem Tabindex) ist für Screenreader schlechter als zwei ehrliche
  // Schalter, die ansagen, ob sie gedrückt sind.
  const toggle = (value: FormIntent, label: string) => (
    <button
      type="button"
      onClick={() => setIntent(value)}
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

      <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label htmlFor={`${id}-make`} className={labelClasses}>
                Marke
              </label>
              <input
                id={`${id}-make`}
                name="make"
                required
                autoComplete="off"
                placeholder="z. B. Volkswagen"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor={`${id}-model`} className={labelClasses}>
                Modell
              </label>
              <input
                id={`${id}-model`}
                name="model"
                required
                autoComplete="off"
                placeholder="z. B. Golf VII"
                className={inputClasses}
              />
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
                name="firstRegistration"
                required
                inputMode="numeric"
                placeholder="TT.MM.JJJJ"
                pattern="\d{2}\.\d{2}\.\d{4}"
                aria-describedby={`${id}-ez-hint`}
                className={inputClasses}
              />
              <p id={`${id}-ez-hint`} className="mt-2 text-sm text-warm-muted">
                Steht im Fahrzeugschein unter Punkt B.
              </p>
            </div>

            <div>
              <label htmlFor={`${id}-mileage`} className={labelClasses}>
                Kilometerstand
              </label>
              <input
                id={`${id}-mileage`}
                name="mileage"
                type="number"
                min="1"
                required
                inputMode="numeric"
                placeholder="z. B. 128000"
                className={inputClasses}
              />
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className={labelClasses}>
              Wonach suchen Sie?
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              required
              rows={5}
              placeholder="z. B. Kombi, Automatik, bis 20.000 € — oder einfach, was Ihnen wichtig ist."
              className={`${inputClasses} resize-y`}
            />
            <p className="mt-2 text-sm text-warm-muted">
              Sie müssen sich noch nicht festlegen. Ein paar Stichworte genügen.
            </p>
          </div>
        )}

        <div>
          <label htmlFor={`${id}-name`} className={labelClasses}>
            Ihr Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelClasses}>
            E-Mail-Adresse
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className={labelClasses}>
            Telefon <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </div>

        {intent === 'sell' && (
          /*
            Kein Fahrzeugschein-Upload. Der Kunde wollte den Schein
            mitgeschickt bekommen (Trello #19) — ein Upload würde aber
            Ausweis- und Halterdaten auf dem Server ablegen und damit
            Rechtsgrundlage, Verschlüsselung, Speicherort und Löschfrist nach
            sich ziehen. Der Hinweis auf die E-Mail erreicht dasselbe Ziel
            ohne dieses Risiko.
          */
          <p className="sm:col-span-2 text-sm text-warm-muted leading-relaxed">
            Sie haben den Fahrzeugschein zur Hand? Schicken Sie ihn uns gern im
            Anschluss per E-Mail an{' '}
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent('Fahrzeugschein zu meiner Ankauf-Anfrage')}`}
              className="text-gold-ink underline underline-offset-2 hover:no-underline break-words"
            >
              {company.email}
            </a>
            . Bitte laden Sie keine Ausweisdokumente über dieses Formular hoch.
          </p>
        )}

        <div className="sm:col-span-2 flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 h-5 w-5 shrink-0 accent-warm-ink"
          />
          <label htmlFor={`${id}-consent`} className="text-sm text-warm-muted leading-relaxed">
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
            Anfrage gespeichert und verarbeitet werden. Die Einwilligung kann
            jederzeit widerrufen werden. Weitere Informationen in der{' '}
            <Link href="/datenschutz" className="text-gold-ink underline underline-offset-2 hover:no-underline">
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {state && (
          <p
            role="status"
            aria-live="polite"
            className={`sm:col-span-2 text-sm font-semibold ${
              state.success ? 'text-gold-ink' : 'text-red-700'
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="sm:col-span-2 mt-3 min-h-[56px] rounded-xl bg-warm-ink px-8 text-sm font-bold uppercase tracking-wider text-card transition-colors hover:bg-warm-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Wird gesendet…' : text.submit}
        </button>
      </form>
    </div>
  )
}
