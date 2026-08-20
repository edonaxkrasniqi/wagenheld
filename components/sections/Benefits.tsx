import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { benefits } from '@/content/benefits'

export function Benefits() {
  return (
    <section id="leistungen" className="bg-surface-lowest border-b border-outline-variant scroll-mt-24">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.headline} className="flex flex-col items-center text-center gap-2">
              <Icon name={benefit.icon} className="text-gold text-3xl" />
              <p className="font-bold text-sm uppercase tracking-wide">{benefit.headline}</p>
              <p className="text-xs text-on-surface-variant">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
