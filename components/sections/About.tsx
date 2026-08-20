import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { aboutContent } from '@/content/about'

export function About() {
  return (
    <section id="ueber-uns" className="bg-surface-lowest scroll-mt-24">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={aboutContent.imageUrl}
            alt={aboutContent.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <SectionLabel className="mb-4">{aboutContent.label}</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {aboutContent.headline}
          </h2>
          <div className="flex flex-col gap-4 text-on-surface-variant leading-relaxed mb-8">
            {aboutContent.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="#kontakt"
            className="inline-flex items-center text-sm font-bold uppercase tracking-wider border-b-2 border-gold pb-1 hover:text-gold transition-colors"
          >
            {aboutContent.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
