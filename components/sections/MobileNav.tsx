'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { navItems } from '@/content/nav'
import { company } from '@/lib/site'

/**
 * Mobile Navigation als Menüband am unteren Rand.
 *
 * Unten statt oben, weil der Daumen dort hinreicht — auf einem heutigen
 * Telefon ist die obere Bildschirmkante einhändig kaum erreichbar. Im Band
 * stehen die drei Wege, die Besucher hier tatsächlich gehen (Bestand
 * ansehen, Fahrzeug anbieten, anrufen), plus das vollständige Menü.
 *
 * Die Schublade lebt hier und nicht mehr im Header, damit Band und Schublade
 * sich denselben Zustand teilen, ohne ihn durch die halbe Seite zu reichen.
 */
export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Zustand während des Renderns anpassen — Reacts vorgesehener Weg für einen
  // Effekt, der nur auf einen geänderten Wert reagiert. Schließt die
  // Schublade bei jeder Navigation, auch bei Zurück und Vorwärts.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const close = () => {
    setOpen(false)
    // Fokus zurück auf den auslösenden Knopf, sonst landet er am Seitenanfang.
    toggleRef.current?.focus()
  }

  const barItem =
    'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-semibold tracking-wide text-white/70 transition-colors hover:text-gold'

  return (
    <>
      {/* Reserviert die Höhe des Bands, damit der Footer nicht darunter
          verschwindet. Das Band selbst ist fixiert und nimmt keinen Platz ein. */}
      <div
        aria-hidden="true"
        className="md:hidden h-[4.25rem] pb-[env(safe-area-inset-bottom)]"
      />

      <nav
        aria-label="Schnellzugriff"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-stretch border-t border-white/10 bg-anthracite pb-[env(safe-area-inset-bottom)]"
      >
        <Link href="/#fahrzeuge" className={barItem}>
          <Icon name="directions_car" className="text-2xl" />
          Fahrzeuge
        </Link>
        <Link href="/#ankauf" className={barItem}>
          <Icon name="sell" className="text-2xl" />
          Ankauf
        </Link>
        <a href={company.phoneHref} className={barItem}>
          <Icon name="call" className="text-2xl" />
          Anrufen
        </a>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          className={barItem}
        >
          <Icon name="menu" className="text-2xl" />
          Menü
        </button>
      </nav>

      <div
        onClick={close}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        // `inert` nimmt die geschlossene Schublade vollständig aus der
        // Tabreihenfolge — aria-hidden allein lässt die Links fokussierbar.
        inert={!open}
        className={`md:hidden fixed inset-x-0 bottom-0 z-[70] flex max-h-[85vh] flex-col rounded-t-2xl bg-surface-lowest shadow-2xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Navigation
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Menü schließen"
            className="-mr-2 flex size-11 items-center justify-center rounded text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-2 py-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded px-4 py-3.5 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface"
              >
                <Icon name={item.icon ?? 'circle'} className="text-xl" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-outline-variant px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link
            href="/#ankauf"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg bg-secondary-container px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-on-secondary-container transition-colors hover:bg-secondary-fixed"
          >
            Fahrzeug anbieten
          </Link>
        </div>
      </div>
    </>
  )
}
