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

            {/*
              Kein Abschnitt „Haftung für Inhalte" und keiner „Haftung für
              Links". Beides war die verbreitete TMG-Textbausteinvorlage, in der
              nur „TMG" durch „DDG" ersetzt worden war. Diese Umschrift ist
              inhaltlich falsch:

              · § 7 DDG heißt „Beschränkte Verantwortlichkeit" und verweist auf
                die Artikel 4 bis 8 der Verordnung (EU) 2022/2065 (DSA). Er ist
                keine Anspruchsgrundlage für die Verantwortlichkeit für eigene
                Inhalte.
              · § 10 DDG regelt das „Auskunftsverlangen der nach Landesrecht
                zuständigen Behörde" bei audiovisuellen Mediendiensten und hat
                mit Haftungsprivilegien nichts zu tun. Die Privilegierung von
                Host-Providern steht heute in Art. 4 bis 6 DSA, das Verbot
                allgemeiner Überwachungspflichten in Art. 8 DSA.

              Beide Abschnitte sind ohnehin reine Wiedergabe der Gesetzeslage:
              Sie begründen und begrenzen keine Haftung. Ein falsches Zitat
              nützt also nichts und schadet — deshalb ersatzlos gestrichen.

              Wer sie wieder aufnehmen will, nimmt vorher die DSA-Artikel zur
              Hand, nicht eine Vorlage aus dem Netz.
            */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
