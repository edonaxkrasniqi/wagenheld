'use client'

import { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Blendet den Inhalt beim Hineinscrollen ein.
 *
 * Wichtigste Regel: **Sichtbarkeit darf nicht von JavaScript abhängen.** Die
 * Animation ist Zugabe, keine Voraussetzung. Vorher lag der Versteckzustand in
 * einer React-State-Variablen — ohne JavaScript blieb die halbe Seite
 * dauerhaft leer, inklusive Kontaktdaten.
 *
 * Jetzt liegt er in CSS (`app/globals.css`, Selektor `[data-reveal]`), und
 * zwar ausschließlich innerhalb von `prefers-reduced-motion: no-preference`.
 * Wer Bewegung abbestellt hat, sieht den Inhalt sofort und ungefiltert. Wer
 * JavaScript abgeschaltet hat, ebenfalls — dafür sorgt der
 * `<noscript>`-Block in `app/layout.tsx`.
 *
 * Diese Komponente setzt deshalb keinen State mehr, sondern schreibt nur noch
 * ein Attribut auf ihren eigenen DOM-Knoten. Genau dafür sind Effekte da: ein
 * externes System (hier das DOM) mit dem Stand von React abgleichen. Ein
 * `setState` im Effektkörper wäre nicht nur ein Lint-Fehler, sondern löste
 * eine Renderkaskade über jede Reveal-Instanz der Seite aus.
 *
 * Bleibt ein Restrisiko: JavaScript ist aktiviert, das Bundle lädt aber nicht.
 * Dann greift `<noscript>` nicht und der Inhalt bliebe verborgen. Deshalb der
 * Sicherheitsnetz-Timer unten — er ist kein Schmuck, sondern der Grund, warum
 * ein hängender IntersectionObserver die Seite nicht mehr leer lässt.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reveal = () => {
      node.dataset.revealed = 'true'
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        reveal()
        observer.disconnect()
      },
      { threshold: 0.15 }
    )
    observer.observe(node)

    // Nach spätestens 1,5 Sekunden ist der Inhalt sichtbar, egal was der
    // Observer macht.
    const fallback = window.setTimeout(() => {
      reveal()
      observer.disconnect()
    }, 1500)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
