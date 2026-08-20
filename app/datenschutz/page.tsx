import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Wagenheld',
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
}

function Todo({ children }: { children: React.ReactNode }) {
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
      <main className="bg-surface-lowest pt-20">
        <div className="max-w-[860px] mx-auto px-5 md:px-10 py-16 md:py-24">
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
                <br />
                <Todo>Firmenname, Anschrift, E-Mail — siehe Impressum</Todo>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">2. Hosting</h2>
              <p>
                Diese Website wird bei <Todo>Hosting-Anbieter, z. B. Cloudflare</Todo> gehostet.
                Beim Aufruf der Website erhebt der Hosting-Anbieter automatisch
                Server-Log-Informationen (u. a. IP-Adresse, Datum und Uhrzeit der Anfrage,
                aufgerufene Seite, verwendeter Browser). Diese Verarbeitung erfolgt auf Grundlage
                unseres berechtigten Interesses an einem sicheren und stabilen Betrieb der Website
                (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Hosting-Anbieter besteht ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                3. Ankauf-/Kontaktformular
              </h2>
              <p>
                Wenn Sie uns über das Ankauf-Formular ein Fahrzeug anbieten, verarbeiten wir die
                von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, optional Telefonnummer,
                Fahrzeugangaben) ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw.
                lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen).
              </p>
              <p className="mt-2">
                Der Versand der Anfrage erfolgt technisch über den E-Mail-Dienstleister{' '}
                <Todo>Resend (resend.com), USA/EU</Todo>, mit dem ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO abgeschlossen wurde. Ihre Daten werden
                nicht an sonstige Dritte weitergegeben und nach Abschluss der Anfragebearbeitung
                gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">4. Cookies</h2>
              <p>
                Diese Website verwendet aktuell keine Cookies zu Analyse- oder Marketingzwecken.
                Sollten künftig Analyse-Tools, Cookies oder vergleichbare Technologien eingesetzt
                werden, wird diese Erklärung entsprechend ergänzt und, falls erforderlich, eine
                Einwilligung über ein Cookie-Banner eingeholt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                5. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht auf Auskunft über Ihre bei uns gespeicherten
                personenbezogenen Daten, deren Herkunft, Empfänger und den Zweck der
                Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser
                Daten (Art. 15–20 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei der zuständigen
                Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                6. SSL-/TLS-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung zur
                Übertragung vertraulicher Inhalte, wie z. B. Anfragen über das Ankauf-Formular.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
