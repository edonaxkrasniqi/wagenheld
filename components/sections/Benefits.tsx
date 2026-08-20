import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { benefits } from '@/content/benefits'

/**
 * Acht Kacheln, mobil einspaltig — Akzeptanzkriterium aus Trello-Karte #30.
 * Rasterlinien statt frei schwebender Icons: liest sich wie ein Datenblatt
 * und passt besser zu einem Autohaus als die übliche Icon-Reihe.
 */
export function Benefits() {
  return (
    <section
      id="leistungen"
      className="bg-surface-lowest border-b border-outline-variant scroll-mt-24"
    >
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <SectionLabel className="mb-10">Was Sie bei uns bekommen</SectionLabel>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-outline-variant">
          {benefits.map((benefit) => (
            <li
              key={benefit.headline}
              className="flex items-start gap-4 border-b border-r border-outline-variant p-6"
            >
              <Icon
                name={benefit.icon}
                className="text-gold-ink text-2xl shrink-0 mt-0.5"
              />
              <div>
                <p className="font-bold text-sm uppercase tracking-wide text-on-surface">
                  {benefit.headline}
                </p>
                <p className="text-sm text-on-surface-variant mt-1 leading-snug">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
