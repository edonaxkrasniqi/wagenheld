'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { submitSellingForm } from '@/lib/actions'
import { sellingImageUrl } from '@/content/about'
import type { FormState } from '@/lib/types'

const inputClasses =
  'w-full bg-surface-lowest border border-outline-variant rounded-lg px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-gold transition-colors'

const initialState: FormState = null

export function VehicleSellingForm() {
  const [state, formAction, pending] = useActionState(submitSellingForm, initialState)

  return (
    <section id="ankauf" className="bg-anthracite scroll-mt-24">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden hidden lg:block">
          <Image
            src={sellingImageUrl}
            alt="Fahrzeugbewertung bei Wagenheld"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>

        <div>
          <SectionLabel className="mb-4">Fahrzeug verkaufen</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Ihr Auto in besten Händen
          </h2>
          <p className="text-white/70 mb-10">
            Erhalten Sie ein faires Angebot für Ihr Fahrzeug — unverbindlich und kostenlos.
          </p>

          <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <input name="make" placeholder="Marke" required className={inputClasses} />
            <input name="model" placeholder="Modell" required className={inputClasses} />
            <input
              name="year"
              type="number"
              placeholder="Baujahr"
              required
              className={inputClasses}
            />
            <input
              name="mileage"
              type="number"
              placeholder="Kilometerstand"
              required
              className={inputClasses}
            />
            <input name="name" placeholder="Ihr Name" required className={inputClasses} />
            <input
              name="email"
              type="email"
              placeholder="E-Mail-Adresse"
              required
              className={inputClasses}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Telefon (optional)"
              className={`${inputClasses} sm:col-span-2`}
            />

            {state && (
              <p
                role="status"
                aria-live="polite"
                className={`sm:col-span-2 text-sm ${state.success ? 'text-gold' : 'text-red-400'}`}
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
