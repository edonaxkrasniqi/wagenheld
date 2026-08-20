import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CarSilhouette } from '@/components/ui/CarSilhouette'
import { Icon } from '@/components/ui/Icon'
import { heroContent } from '@/content/about'
import { company } from '@/lib/site'

export function Hero() {
  return (
    <section className="on-dark relative bg-anthracite pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroContent.imageUrl}
          alt={heroContent.imageAlt}
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        {/*
          Overlay sichert die Lesbarkeit über dem Foto. Der Verlauf ist unten
          fast deckend, damit der Text auch bei einem hellen Bild die
          geforderten 4,5:1 erreicht (Akzeptanzkriterium Trello-Karte #29).
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/85 to-anthracite/55" />
      </div>

      <CarSilhouette className="pointer-events-none absolute -bottom-6 right-0 w-[min(760px,105%)] text-white/[0.055]" />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 py-28 md:py-44 flex flex-col items-start">
        <SectionLabel tone="onDark" className="mb-6">
          {heroContent.label}
        </SectionLabel>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.95]">
          {heroContent.headline}
        </h1>

        {/* Slogan als echter Text, nicht als Bild — SEO und Screenreader. */}
        <p className="mt-4 text-xl md:text-2xl font-semibold text-gold max-w-2xl text-balance">
          {heroContent.slogan}
        </p>

        <p className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
          {heroContent.paragraph}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 bg-gold text-anthracite text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-secondary-fixed transition-colors"
          >
            {heroContent.primaryCta.label}
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center justify-center border border-white/35 text-white text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </div>

        {/* Standort und Telefon direkt im ersten Bildschirm — auf dem Handy
            ist der Anruf die häufigste Handlung eines Autohaus-Besuchers. */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-white/75">
          <span className="inline-flex items-center gap-2">
            <Icon name="location_on" className="text-lg text-gold" />
            {company.street}, {company.postalCode} {company.city}
          </span>
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 font-semibold text-white hover:text-gold transition-colors"
          >
            <Icon name="call" className="text-lg text-gold" />
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
