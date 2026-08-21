'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import { navItems } from '@/content/nav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-anthracite border-b border-white/5 transition-all duration-300 ${
          scrolled ? 'h-12 shadow-lg' : 'h-14'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
          {/* Waagerechte Sperrung wie im Kundenentwurf: Bildmarke, daneben der
              Schriftzug. Die gestapelte Vollversion des Logos braucht mehr
              Höhe, als eine schlanke Leiste hergibt. */}
          <Link
            href="#"
            className="flex items-center gap-2.5 rounded"
            aria-label="Automobilzentrum Wagenheld – zur Startseite"
          >
            <Image
              src="/images/logo-mark-white.png"
              alt=""
              width={829}
              height={532}
              className="h-7 w-auto"
              priority
            />
            <span className="text-base font-bold tracking-tight text-white uppercase select-none leading-none">
              Wagenheld
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  item.active
                    ? 'text-white border-b-2 border-gold pb-1'
                    : 'text-white/75 hover:text-gold'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#ankauf"
            className="hidden md:inline-flex items-center bg-secondary-container text-on-secondary-container text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-secondary-fixed transition-colors uppercase tracking-wider"
          >
            Fahrzeug anbieten
          </Link>

          <button
            className="md:hidden text-white p-1.5 rounded"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <Icon name="menu" className="text-2xl" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        className={`fixed left-0 top-0 h-full w-80 z-[70] bg-surface-lowest border-r border-outline-variant shadow-xl transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col py-8 px-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-bold tracking-tight uppercase">Menü</span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Menü schließen"
              className="p-2 rounded text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <Icon name="close" />
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-colors text-sm font-semibold ${
                    item.active
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface-variant hover:bg-surface-high hover:text-on-surface'
                  }`}
                >
                  <Icon name={item.icon ?? 'circle'} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
