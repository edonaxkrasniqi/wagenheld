'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { navItems } from '@/content/nav'

/**
 * Kopfleiste. Ab `md` trägt sie die vollständige Navigation; darunter bleibt
 * sie bewusst auf Logo reduziert — dort übernimmt das Menüband am unteren
 * Rand (siehe MobileNav), weil der Daumen die obere Kante kaum erreicht.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-anthracite border-b border-white/5 transition-all duration-300 ${
        scrolled ? 'h-14 shadow-lg' : 'h-16'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
        {/* Das Volllogo, weiße Fassung — auf der dunklen Leiste ist die
            dunkle Datei unsichtbar. Es trägt den Schriftzug bereits, ein
            zweites gesetztes "WAGENHELD" daneben wäre dieselbe Aussage
            zweimal. Die Leiste ist dafür 8 px höher als zuvor; das Logo ist
            gestapelt und braucht diese Höhe, um lesbar zu bleiben. */}
        <Link
          href="/"
          className="flex items-center rounded"
          aria-label="Automobilzentrum Wagenheld – zur Startseite"
        >
          <Image
            src="/images/logo-white.png"
            alt=""
            width={1149}
            height={867}
            className={`w-auto transition-[height] duration-300 ${
              scrolled ? 'h-10' : 'h-12'
            }`}
            priority
          />
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
          href="/#ankauf"
          className="hidden md:inline-flex items-center bg-secondary-container text-on-secondary-container text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-secondary-fixed transition-colors uppercase tracking-wider"
        >
          Fahrzeug anbieten
        </Link>
      </div>
    </header>
  )
}
