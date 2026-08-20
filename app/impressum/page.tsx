import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { company } from '@/lib/site'

export const metadata: Metadata = {
  title: `Impressum — ${company.shortName}`,
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 DDG.',
  robots: { index: false, follow: true },
}

/**
 * Offene Punkte, die nur der Kunde beantworten kann, bleiben sichtbar
 * markiert. Ein Impressum mit erfundenen Angaben ist schlimmer als eines
 * mit sichtbaren Lücken: unvollständige Angaben sind nach § 5 DDG
 * abmahnfähig, falsche zusätzlich nach § 5 UWG.
 */
function Offen({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded text-sm font-semibold">
      {children}
    </span>
  )
}

export default function ImpressumPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" className="bg-surface-lowest pt-20 flex-1">
        <div className="max-w-[760px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Impressum
          </h1>

          <div className="flex flex-col gap-8 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Angaben gemäß § 5 DDG
              </h2>
              <address className="not-italic">
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </address>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Vertreten durch die Gesellschafter
              </h2>
              <p>
                <Offen>
                  Vor- und Nachnamen aller vertretungsberechtigten Gesellschafter
                </Offen>
              </p>
              <p className="mt-2 text-sm">
                Bei einer Gesellschaft bürgerlichen Rechts müssen die
                vertretungsberechtigten Gesellschafter namentlich genannt werden.
                Der Firmenname allein genügt nicht.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Kontakt</h2>
              <p>
                Telefon:{' '}
                <a href={company.phoneHref} className="underline hover:text-gold-ink">
                  {company.phone}
                </a>
                <br />
                E-Mail:{' '}
                <a
                  href={`mailto:${company.email}`}
                  className="underline hover:text-gold-ink break-words"
                >
                  {company.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Gesellschaftsregister
              </h2>
              <p>
                <Offen>
                  Nur ausfüllen, falls die GbR als eGbR eingetragen ist —
                  Registergericht und Registernummer (GsR …)
                </Offen>
              </p>
              <p className="mt-2 text-sm">
                Eine nicht eingetragene GbR steht in keinem Register. Der zuvor
                hier stehende Handelsregister-Abschnitt war falsch und ist
                entfernt. Seit dem 01.01.2024 kann sich eine GbR freiwillig ins
                Gesellschaftsregister eintragen lassen; nur dann gehören
                Registergericht und Nummer ins Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p>
                <Offen>
                  USt-IdNr. gemäß § 27a UStG, falls vorhanden — sonst diesen
                  Abschnitt ersatzlos streichen
                </Offen>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>
                <Offen>Name eines Gesellschafters, Anschrift wie oben</Offen>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit und nicht verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
              <p className="mt-2 text-sm">
                Der Link zur EU-Plattform für Online-Streitbeilegung wurde
                entfernt. Die Plattform hat ihren Betrieb am 20.07.2025
                eingestellt; ein weiterhin gesetzter Hinweis führt auf eine tote
                Seite und gilt als irreführend.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die
                auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Haftung für Links
              </h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
