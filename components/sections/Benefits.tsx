import { Icon } from '@/components/ui/Icon'
import { benefits } from '@/content/benefits'

/**
 * Leistungsstreifen direkt unter dem Hero, im Design des Kundenentwurfs vom
 * 17.08.: feines Linien-Symbol, darüber die kurze Bezeichnung, darunter der
 * erklärende Halbsatz — je Punkt eine Zelle, getrennt durch Haarlinien.
 *
 * Die Trennlinien entstehen über `gap-px` auf einem Raster mit heller
 * Hintergrundfarbe: die Zellen decken es wieder ab, übrig bleibt exakt eine
 * 1px-Linie zwischen ihnen. Das sitzt bei jeder Spaltenzahl richtig, während
 * Rahmen an den Zellen an jedem Umbruch nachjustiert werden müssten.
 */
export function Benefits() {
  return (
    <section
      id="leistungen"
      className="on-dark bg-anthracite border-t border-white/10 scroll-mt-16"
    >
      <ul className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-white/10">
        {benefits.map((benefit) => (
          <li
            key={benefit.headline}
            className="flex items-start gap-3 bg-anthracite px-5 py-6"
          >
            <Icon
              name={benefit.icon}
              className="icon-thin text-gold text-[1.75rem] shrink-0 -mt-0.5"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight">
                {benefit.headline}
              </p>
              <p className="mt-1 text-xs text-white/60 leading-snug">
                {benefit.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
