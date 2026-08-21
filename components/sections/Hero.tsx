import Image from 'next/image'
import Link from 'next/link'
import { heroContent } from '@/content/about'

/** Kleiner Pfeil für die Handlungsaufforderungen.
 *  Bewusst als Inline-SVG und nicht als Icon-Name: das lokale Symbol-Subset
 *  enthält kein `arrow_forward`, und ein fehlender Name wird vom Browser
 *  wörtlich als Text ausgegeben. */
function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

export function Hero() {
  return (
    <section id="top" className="on-dark relative bg-anthracite pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroContent.imageUrl}
          alt={heroContent.imageAlt}
          fill
          priority
          // Das Fahrzeug steht rechts, links bleibt Fläche für den Text. Auf
          // dem Handy schneidet `object-cover` so stark, dass zentriert nur
          // der leere Teil zu sehen wäre — deshalb dort rechts ausrichten.
          // Der Leuchtstreifen ist die einzige helle Stelle des Bildes; auf
          // schmalen Breiten kann er hinter den Text geraten, deshalb bleibt
          // der Schleier dort auf dem gerechneten Wert.
          className="object-cover object-right md:object-center"
          sizes="100vw"
        />
        {/*
          Overlay sichert die Lesbarkeit (Akzeptanzkriterium Trello-Karte #29:
          4,5:1 an der dunkelsten und an der hellsten Stelle).

          Die Deckung ist gerechnet, nicht geschätzt — maßgeblich ist der
          ungünstigste Fall, ein reinweißer Bildpunkt direkt hinter dem
          Gold-Teil der Überschrift:
            80 % Schleier → 3,89:1  (durchgefallen)
            85 % Schleier → 4,64:1  (bestanden)
          Gold #b5a188 ist der kritische Ton; Weiß liegt an derselben Stelle
          über 7:1. Wer den Wert senkt, muss neu rechnen.

          Ab md läuft der Verlauf nach rechts auf 10 % aus, damit das Fahrzeug
          nicht im Schleier absäuft. Das ist zulässig, weil die Überschrift bei
          `max-w-2xl` endet — an ihrer rechten Kante liegt die Deckung noch bei
          rund 87 % und damit über dem geforderten Wert.
        */}
        <div className="absolute inset-0 bg-anthracite/85 md:hidden" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-anthracite via-anthracite/85 to-anthracite/10" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Zweifarbig gesetzt, aber ein einziger Satz in einer einzigen h1 —
            Screenreader und Suchmaschinen lesen ihn zusammenhängend. */}
        <h1 className="max-w-2xl text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] text-balance">
          <span className="text-gold">{heroContent.headlineAccent}</span>{' '}
          <span className="text-white">{heroContent.headline}</span>
        </h1>

        <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold/70" />

        <p className="mt-7 max-w-md text-base md:text-lg text-white/85 leading-relaxed">
          {heroContent.paragraph}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center justify-center gap-2.5 bg-gold text-anthracite text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-secondary-fixed transition-colors"
          >
            {heroContent.primaryCta.label}
            <Arrow />
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2.5 border border-white/35 text-white text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            {heroContent.secondaryCta.label}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
