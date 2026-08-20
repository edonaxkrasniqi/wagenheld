'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Blendet den Inhalt beim Hineinscrollen ein.
 *
 * Zwei Dinge waren vorher kaputt:
 *
 * 1. Die Prüfung auf "prefers-reduced-motion" stand im useState-Initializer.
 *    Bei serverseitig gerendertem HTML übernimmt React beim Hydrieren den
 *    Server-Wert und verwirft den Initializer auf dem Client — die
 *    Systemeinstellung wurde also schlicht ignoriert.
 * 2. Wenn der IntersectionObserver aus irgendeinem Grund nicht auslöst,
 *    blieb der halbe Seiteninhalt dauerhaft unsichtbar. Genau das ist beim
 *    Erstellen der Screenshots passiert. Ein Nutzer hätte eine leere Seite
 *    gesehen und nie erfahren, warum.
 *
 * Deshalb: Reduced-Motion wird jetzt im Effekt geprüft, und es gibt einen
 * Sicherheitsnetz-Timer. Nach spätestens 1,5 Sekunden ist der Inhalt sichtbar,
 * egal was der Observer macht.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)

    const fallback = window.setTimeout(() => {
      setVisible(true)
      observer.disconnect()
    }, 1500)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [visible])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
