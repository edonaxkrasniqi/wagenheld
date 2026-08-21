'use client'

import { useActionState, useId, useState } from 'react'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { submitSellingForm } from '@/lib/actions'
import { company } from '@/lib/site'
import type { FormIntent } from '@/lib/schemas'
import type { FormState } from '@/lib/types'

/**
 * Felder auf dunklem Grund statt weißer Kästen: die weiße Füllung erschlug den
 * ganzen Abschnitt, das Formular sah aus wie ein fremdes Element in der Karte.
 *
 * Die Werte sind nicht frei gewählt. Auf Anthrazit (#111719) muss die
 * Feldbegrenzung nach WCAG 1.4.11 mindestens 3:1 erreichen — `white/15`
 * kommt nur auf 1,6:1, `white/40` auf 3,98:1. Der Platzhalter liegt bei
 * `white/50` auf 4,9:1. Wer diese Werte senkt, muss neu rechnen.
 *
 * Kein `outline-none` ohne Ersatz: die Rahmenfarbe allein ist kein
 * Fokusindikator. Der Ring kommt aus der globalen :focus-visible-Regel, die
 * `on-dark` auf die helle Variante umstellt.
 */
const inputClasses =
  'w-full bg-white/[0.06] border border-white/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/50 hover:border-white/60 focus:border-gold transition-colors'

const labelClasses = 'block text-xs font-semibold uppercase tracking-wide text-white/80 mb-1.5'

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
      className={`rounded-md px-3 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider transition-colors ${
        intent === value
          ? 'bg-secondary-container text-on-secondary-container'
          : 'text-white/70 hover:text-gold'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div id="ankauf" className="scroll-mt-20">
      <SectionLabel tone="onDark" className="mb-4">
        Anfrage senden
      </SectionLabel>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 text-balance">
        {text.headline}
      </h2>
      <p className="text-sm leading-relaxed text-white/75 mb-7">{text.lead}</p>

      <div
        role="group"
        aria-label="Art der Anfrage"
        className="mb-7 grid grid-cols-2 gap-1 rounded-lg border border-white/20 p-1"
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
              <p id={`${id}-ez-hint`} className="mt-1.5 text-xs text-white/60">
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
              rows={4}
              placeholder="z. B. Kombi, Automatik, bis 20.000 € — oder einfach, was Ihnen wichtig ist."
              className={`${inputClasses} resize-y`}
            />
            <p className="mt-1.5 text-xs text-white/60">
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
          <p className="sm:col-span-2 text-xs text-white/60 leading-relaxed">
            Sie haben den Fahrzeugschein zur Hand? Schicken Sie ihn uns gern im
            Anschluss per E-Mail an{' '}
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent('Fahrzeugschein zu meiner Ankauf-Anfrage')}`}
              className="text-gold hover:underline break-words"
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
            className="mt-1 h-4 w-4 shrink-0 accent-gold"
          />
          <label htmlFor={`${id}-consent`} className="text-xs text-white/75 leading-relaxed">
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner
            Anfrage gespeichert und verarbeitet werden. Die Einwilligung kann
            jederzeit widerrufen werden. Weitere Informationen in der{' '}
            <Link href="/datenschutz" className="text-gold hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>

        {state && (
          <p
            role="status"
            aria-live="polite"
            className={`sm:col-span-2 text-sm ${
              state.success ? 'text-gold' : 'text-red-300'
            }`}
          >
            {state.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={pending}
          variant="secondary"
          className="sm:col-span-2 mt-3 disabled:opacity-60"
        >
          {pending ? 'Wird gesendet…' : text.submit}
        </Button>
      </form>
    </div>
  )
}
