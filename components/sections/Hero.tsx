import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { heroContent } from '@/content/about'

export function Hero() {
  return (
    <section className="relative bg-anthracite pt-20">
      <div className="absolute inset-0">
        <Image
          src={heroContent.imageUrl}
          alt={heroContent.imageAlt}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/70 to-anthracite/30" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 py-32 md:py-48 flex flex-col items-start">
        <SectionLabel className="mb-4">{heroContent.label}</SectionLabel>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-6">
          {heroContent.headline}
        </h1>
        <p className="max-w-xl text-lg text-white/80 leading-relaxed mb-10">
          {heroContent.paragraph}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center justify-center bg-gold text-anthracite text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-secondary-fixed transition-colors"
          >
            {heroContent.primaryCta.label}
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center justify-center border border-white/30 text-white text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
