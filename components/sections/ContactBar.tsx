import { Icon } from '@/components/ui/Icon'
import { contactItems } from '@/content/about'

export function ContactBar() {
  return (
    <section id="kontakt" className="bg-secondary-container scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactItems.map((item) => {
          const content = (
            <>
              <Icon name={item.icon} className="text-3xl text-on-secondary-container" />
              <div>
                <p className="text-xs uppercase tracking-wide text-on-secondary-container/70">
                  {item.label}
                </p>
                <p className="font-bold text-on-secondary-container">{item.value}</p>
              </div>
            </>
          )

          return item.href ? (
            <a key={item.label} href={item.href} className="flex items-center gap-4">
              {content}
            </a>
          ) : (
            <div key={item.label} className="flex items-center gap-4">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
