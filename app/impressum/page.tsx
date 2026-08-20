import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Impressum — Wagenheld',
  description: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG.',
}

function Todo({ children }: { children: React.ReactNode }) {
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
      <main className="bg-surface-lowest pt-20">
        <div className="max-w-[860px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Impressum</h1>

          <div className="flex flex-col gap-8 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                <Todo>Firmenname / Rechtsform</Todo>
                <br />
                <Todo>Straße und Hausnummer</Todo>
                <br />
                <Todo>PLZ und Ort</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Vertreten durch</h2>
              <p>
                <Todo>Name des Geschäftsführers / Inhabers</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Kontakt</h2>
              <p>
                Telefon: <Todo>+49 (0) 123 456 789</Todo>
                <br />
                E-Mail: <Todo>info@wagenheld.de</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Registereintrag</h2>
              <p>
                Eintragung im Handelsregister.
                <br />
                Registergericht: <Todo>Amtsgericht …</Todo>
                <br />
                Registernummer: <Todo>HRB …</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                <br />
                <Todo>DE …</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p>
                <Todo>Name, Anschrift wie oben</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="underline hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
                verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
                als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
