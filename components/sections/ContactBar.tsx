import { Icon } from '@/components/ui/Icon'
import { contactItems } from '@/content/about'

export function ContactBar() {
  return (
    <section id="kontakt" className="bg-secondary-container scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-14">
        <h2 className="sr-only">Kontakt</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item) => {
            const content = (
              <>
                <Icon
                  name={item.icon}
                  className="text-3xl text-on-secondary-container shrink-0"
                />
                <span className="min-w-0">
                  {/*
                    Vorher stand hier text-on-secondary-container/70. Die
                    Transparenz drückte den Kontrast auf rund 2,4:1 und fiel
                    damit durch WCAG AA. Jetzt volle Deckkraft.
                  */}
                  <span className="block text-xs uppercase tracking-wide text-on-secondary-container">
                    {item.label}
                  </span>
                  <span className="block font-bold text-on-secondary-container break-words">
                    {item.value}
                  </span>
                </span>
              </>
            )

            return (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-start gap-4 rounded hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <span className="flex items-start gap-4">{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
