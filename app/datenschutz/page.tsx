import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { company } from '@/lib/site'

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${company.shortName}`,
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  robots: { index: false, follow: true },
}

function Offen({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded text-sm font-semibold">
      {children}
    </span>
  )
}

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" className="bg-surface-lowest pt-14 flex-1">
        <div className="max-w-[760px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
            Datenschutzerklärung
          </h1>

          <div className="flex flex-col gap-8 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                1. Verantwortlicher
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <address className="not-italic mt-2">
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}
                <br />
                <a
                  href={`mailto:${company.email}`}
                  className="underline hover:text-gold-ink break-words"
                >
                  {company.email}
                </a>
                <br />
                <a href={company.phoneHref} className="underline hover:text-gold-ink">
                  {company.phone}
                </a>
              </address>
              <p className="mt-2 text-sm">
                Vertretungsberechtigte Gesellschafter: siehe{' '}
                <Link href="/impressum" className="underline hover:text-gold-ink">
                  Impressum
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                2. Datenschutzbeauftragter
              </h2>
              <p>
                Ein Datenschutzbeauftragter ist nicht bestellt. Eine
                Bestellpflicht besteht nach § 38 BDSG erst ab 20 Personen, die
                ständig mit der automatisierten Verarbeitung personenbezogener
                Daten beschäftigt sind. Bei Fragen zum Datenschutz wenden Sie
                sich bitte an die oben genannte Adresse.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">3. Hosting</h2>
              <p>
                Diese Website wird bei{' '}
                <Offen>Hosting-Anbieter mit vollständigem Namen und Anschrift</Offen>{' '}
                gehostet. Beim Aufruf der Website erhebt der Hosting-Anbieter
                automatisch Server-Log-Informationen (unter anderem IP-Adresse,
                Datum und Uhrzeit der Anfrage, aufgerufene Seite, verwendeter
                Browser). Diese Verarbeitung erfolgt auf Grundlage unseres
                berechtigten Interesses an einem sicheren und stabilen Betrieb der
                Website (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Hosting-Anbieter
                besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                4. Schriftarten und Symbole
              </h2>
              <p>
                Schriftarten und Symbol-Schriften werden ausschließlich lokal von
                unserem Server ausgeliefert. Es besteht keine Verbindung zu
                Google Fonts oder anderen externen Anbietern, und es wird dabei
                keine IP-Adresse an Dritte übertragen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                5. Ankauf-Formular
              </h2>
              <p>
                Wenn Sie uns über das Ankauf-Formular ein Fahrzeug anbieten,
                verarbeiten wir die von Ihnen eingegebenen Daten — Name,
                E-Mail-Adresse, optional Telefonnummer sowie die Fahrzeugangaben
                Marke, Modell, Erstzulassung und Kilometerstand — ausschließlich
                zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme.
              </p>
              <p className="mt-2">
                Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a
                DSGVO, die Sie beim Absenden des Formulars ausdrücklich erteilen,
                sowie Art. 6 Abs. 1 lit. b DSGVO für Maßnahmen zur Anbahnung
                eines Vertrags. Sie können Ihre Einwilligung jederzeit formlos
                widerrufen; die Rechtmäßigkeit der bis dahin erfolgten
                Verarbeitung bleibt davon unberührt.
              </p>
              <p className="mt-2">
                Der Versand erfolgt technisch über den E-Mail-Dienstleister
                Resend (Resend, Inc., USA), mit dem ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO besteht. Die
                Übermittlung in die USA erfolgt auf Grundlage der
                Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO in
                Verbindung mit dem EU-US Data Privacy Framework.
              </p>
              <p className="mt-2">
                Ihre Daten werden nicht an sonstige Dritte weitergegeben und
                spätestens{' '}
                <Offen>Löschfrist festlegen, z. B. 6 Monate</Offen> nach
                Abschluss der Anfragebearbeitung gelöscht, soweit keine
                gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
              <p className="mt-2">
                Über das Formular werden bewusst keine Dateien entgegengenommen.
                Fahrzeugscheine und ähnliche Dokumente senden Sie uns bitte per
                E-Mail, damit sie nicht dauerhaft auf dem Webserver liegen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">6. Cookies</h2>
              <p>
                Diese Website verwendet keine Cookies zu Analyse- oder
                Marketingzwecken und bindet keine externen Dienste ein, die vor
                einer Einwilligung Daten übertragen. Sollten künftig
                Analyse-Tools, Karten, Videos oder vergleichbare Technologien
                eingesetzt werden, wird diese Erklärung ergänzt und, soweit
                erforderlich, vorab eine Einwilligung eingeholt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                7. Externe Links
              </h2>
              <p>
                Von dieser Website führen Links zu externen Angeboten, unter
                anderem zu unserem Fahrzeugbestand auf mobile.de und zu einer
                Kartensuche. Diese Anbieter werden erst aktiv, wenn Sie den Link
                anklicken. Für deren Datenverarbeitung gelten die
                Datenschutzerklärungen der jeweiligen Anbieter.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                8. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht auf Auskunft über Ihre bei uns
                gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger
                und den Zweck der Datenverarbeitung sowie ein Recht auf
                Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO).
              </p>
              <p className="mt-2">
                Zudem steht Ihnen ein Beschwerderecht bei einer
                Datenschutz-Aufsichtsbehörde zu. Zuständig ist der Landesbeauftragte
                für den Datenschutz und die Informationsfreiheit Baden-Württemberg,
                Lautenschlagerstraße 20, 70173 Stuttgart.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                9. SSL-/TLS-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine
                SSL-/TLS-Verschlüsselung zur Übertragung vertraulicher Inhalte,
                etwa Ihrer Anfragen über das Ankauf-Formular.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                10. Stand dieser Erklärung
              </h2>
              <p>
                <Offen>Datum beim Livegang eintragen</Offen>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
