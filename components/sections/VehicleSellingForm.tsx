'use client'

import { useActionState, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { submitSellingForm } from '@/lib/actions'
import { sellingImageUrl } from '@/content/about'
import { company } from '@/lib/site'
import type { FormState } from '@/lib/types'

const inputClasses =
  'w-full bg-surface-lowest border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-gold transition-colors'

const labelClasses = 'block text-xs font-semibold uppercase tracking-wide text-white/80 mb-1.5'

const initialState: FormState = null

export function VehicleSellingForm() {
  const [state, formAction, pending] = useActionState(submitSellingForm, initialState)
  const id = useId()

  return (
    <section id="ankauf" className="on-dark bg-anthracite scroll-mt-24">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden hidden lg:block">
          <Image
            src={sellingImageUrl}
            alt="Fahrzeugbewertung im Automobilzentrum Wagenheld"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>

        <div>
          <SectionLabel tone="onDark" className="mb-5">
            Fahrzeug verkaufen
          </SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
            Wir nehmen Ihren Wagen in Zahlung
          </h2>
          <p className="text-white/80 mb-10">
            Schicken Sie uns die Eckdaten. Wir melden uns mit einer Einschätzung
            zurück — unverbindlich und kostenlos.
          </p>

          <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Honeypot: echte Besucher füllen dieses Feld nie aus, Bots oft. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

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

            {/*
              Kein Fahrzeugschein-Upload. Der Kunde wollte den Schein
              mitgeschickt bekommen (Trello #19) — ein Upload würde aber
              Ausweis- und Halterdaten auf dem Server ablegen und damit
              Rechtsgrundlage, Verschlüsselung, Speicherort und Löschfrist
              nach sich ziehen. Der Hinweis auf die E-Mail erreicht dasselbe
              Ziel ohne dieses Risiko.
            */}
            <p className="sm:col-span-2 text-xs text-white/60 leading-relaxed">
              Sie haben den Fahrzeugschein zur Hand? Schicken Sie ihn uns gern
              im Anschluss per E-Mail an{' '}
              <a
                href={`mailto:${company.email}`}
                className="text-gold hover:underline break-words"
              >
                {company.email}
              </a>
              . Bitte laden Sie keine Ausweisdokumente über dieses Formular hoch.
            </p>

            <div className="sm:col-span-2 flex items-start gap-3">
              <input
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-gold"
              />
              <label
                htmlFor={`${id}-consent`}
                className="text-xs text-white/75 leading-relaxed"
              >
                Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
                meiner Anfrage gespeichert und verarbeitet werden. Die
                Einwilligung kann jederzeit widerrufen werden. Weitere
                Informationen in der{' '}
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
              className="sm:col-span-2 mt-2 disabled:opacity-60"
            >
              {pending ? 'Wird gesendet…' : 'Kostenlos bewerten lassen'}
            </Button>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
