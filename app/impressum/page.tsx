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
 * Alle Pflichtangaben liegen inzwischen vom Kunden vor; die früheren
 * OFFEN-Markierungen sind deshalb ersatzlos entfallen. Die Werte kommen aus
 * `lib/site.ts`, damit Impressum, Datenschutzerklärung und Footer nicht
 * auseinanderlaufen. Erfundene Angaben sind nach § 5 UWG angreifbar,
 * unvollständige nach § 5 DDG — beides bleibt der Maßstab, falls hier je
 * wieder etwas ergänzt wird.
 */
export default function ImpressumPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" className="bg-surface-lowest pt-16 flex-1">
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
                Vertretungsberechtigter Gesellschafter
              </h2>
              <p>{company.representative}</p>
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

            {/*
              Kein Register-Abschnitt. Eine GbR steht nicht im
              Handelsregister; ins Gesellschaftsregister ist diese hier nach
              Auskunft des Kunden nicht eingetragen. Ein leerer oder
              erklärender Abschnitt wäre schlechter als keiner — bitte nicht
              „der Vollständigkeit halber" wieder aufnehmen.
            */}

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p>
                USt-IdNr. gemäß § 27a UStG: {company.vatId}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <address className="not-italic">
                {company.representative}
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </address>
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
              {/*
                Der frühere Link auf ec.europa.eu/consumers/odr ist entfernt.
                Die EU-Plattform zur Online-Streitbeilegung hat den Betrieb am
                20.07.2025 eingestellt. Ein Hinweis darauf zeigt seitdem ins
                Leere und ist selbst irreführend.
              */}
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
