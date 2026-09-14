import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import {
  company,
  privacyPolicyDate,
  processors,
  supervisoryAuthority,
} from '@/lib/site'

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${company.shortName}`,
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  robots: { index: false, follow: true },
}

/**
 * Maßstab dieser Seite ist Art. 13 DSGVO: Zweck, Rechtsgrundlage, Empfänger,
 * Drittlandtransfer, Speicherdauer und Betroffenenrechte — und zwar so, wie es
 * technisch tatsächlich abläuft.
 *
 * Der Abgleich in beide Richtungen ist Pflicht: Jeder hier genannte Dienst muss
 * im Code vorkommen, und jeder Dienst im Code muss hier stehen. Die
 * Firmierungen kommen aus `lib/site.ts`, damit sie nicht an mehreren Stellen
 * auseinanderlaufen.
 */
export default function DatenschutzPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" className="bg-surface-lowest pt-16 flex-1">
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
                Vertretungsberechtigter Gesellschafter:{' '}
                {company.representative}. Weitere Angaben im{' '}
                <Link href="/impressum" className="underline hover:text-gold-ink">
                  Impressum
                </Link>
                .
              </p>
            </section>

            {/*
              Die frühere Fassung nannte „ab 20 Personen" als alleinige
              Voraussetzung. Das ist zu absolut: § 38 Abs. 1 BDSG kennt daneben
              weitere Tatbestände, und Art. 37 Abs. 1 DSGVO greift unabhängig
              von der Mitarbeiterzahl. Deshalb steht hier nur noch das Ergebnis
              der tatsächlichen Prüfung, nicht deren vermeintliche Begründung.
            */}
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                2. Datenschutzbeauftragter
              </h2>
              <p>
                Wir haben geprüft, ob wir einen Datenschutzbeauftragten benennen
                müssen. Nach dem Ergebnis dieser Prüfung besteht für uns keine
                Benennungspflicht nach Art. 37 DSGVO in Verbindung mit § 38 BDSG;
                ein Datenschutzbeauftragter ist deshalb nicht bestellt. Bei Fragen
                zum Datenschutz wenden Sie sich bitte an die unter Ziffer 1
                genannten Kontaktdaten.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                3. Hosting und Server-Protokolle
              </h2>
              <p>
                Diese Website wird bei {processors.hosting.name},{' '}
                {processors.hosting.address}, betrieben und ausgeliefert. Beim
                Aufruf der Website verarbeitet der Anbieter automatisch technische
                Verbindungsdaten (unter anderem IP-Adresse, Datum und Uhrzeit der
                Anfrage, aufgerufene Adresse, übertragene Datenmenge,
                Referrer-Adresse sowie Browser- und Betriebssystemkennung).
              </p>
              <p className="mt-2">
                Diese Verarbeitung ist für die Auslieferung der Seite technisch
                notwendig und dient zugleich der Abwehr von Angriffen und
                Überlastungen. Rechtsgrundlage ist unser berechtigtes Interesse an
                einem sicheren und stabilen Betrieb der Website (Art. 6 Abs. 1
                lit. f DSGVO). Mit dem Anbieter besteht ein Vertrag zur
                Auftragsverarbeitung nach Art. 28 DSGVO.
              </p>
              <p className="mt-2">
                {processors.hosting.name} betreibt ein weltweites Servernetz. Eine
                Verarbeitung außerhalb der Europäischen Union, insbesondere in den
                Vereinigten Staaten, kann deshalb nicht ausgeschlossen werden. Sie
                erfolgt auf Grundlage der Standardvertragsklauseln nach Art. 46
                Abs. 2 lit. c DSGVO.
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

            {/*
              Neu und im Audit ausdrücklich angemahnt: Die frühere Fassung
              beschrieb nur das Ankauf-Formular. Tatsächlich gibt es zwei
              Anfragearten, und die häufigste Kontaktaufnahme läuft ohnehin über
              Telefon und E-Mail. Beides gehört hierher.
            */}
            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                5. Anfragen über die Formulare
              </h2>
              <p>
                Auf dieser Website stehen zwei Anfragearten zur Verfügung. Beide
                nutzen dasselbe Formular und denselben Versandweg:
              </p>
              <ul className="mt-2 list-disc pl-5 flex flex-col gap-1">
                <li>
                  <strong className="text-on-surface">Fahrzeug anbieten:</strong>{' '}
                  Marke, Modell, Erstzulassung und Kilometerstand sowie Ihr Name,
                  Ihre E-Mail-Adresse und optional Ihre Telefonnummer.
                </li>
                <li>
                  <strong className="text-on-surface">Fahrzeug suchen:</strong>{' '}
                  Ihre Freitextbeschreibung des gesuchten Fahrzeugs sowie Ihr
                  Name, Ihre E-Mail-Adresse und optional Ihre Telefonnummer.
                </li>
              </ul>
              <p className="mt-2">
                Wir verarbeiten diese Angaben ausschließlich, um Ihre Anfrage zu
                bearbeiten und mit Ihnen Kontakt aufzunehmen.
              </p>
              {/*
                Rechtsgrundlage bewusst lit. b, nicht lit. a. Eine Einwilligung
                muss nach Art. 7 Abs. 4 DSGVO freiwillig sein; ein Häkchen, ohne
                das das Formular nicht absendet, ist das nicht. Das Häkchen im
                Formular bestätigt deshalb nur noch die Kenntnisnahme dieser
                Hinweise. Siehe `consentSchema` in lib/schemas.ts.
              */}
              <p className="mt-2">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO: Ihre Anfrage
                betrifft die Anbahnung eines Kauf- oder Verkaufsvertrags, und die
                Verarbeitung Ihrer Angaben ist erforderlich, um sie überhaupt
                beantworten zu können. Eine gesonderte Einwilligung holen wir
                dafür nicht ein — das Kästchen im Formular bestätigt lediglich,
                dass Sie diese Hinweise zur Kenntnis genommen haben. Sie können
                der Verarbeitung nach Art. 21 DSGVO widersprechen; Ihre Anfrage
                lässt sich dann allerdings nicht mehr bearbeiten.
              </p>
              <p className="mt-2">
                Der technische Versand erfolgt über {processors.mailDelivery.brand}
                , einen Dienst der {processors.mailDelivery.name},{' '}
                {processors.mailDelivery.address}. Dabei werden Ihre
                E-Mail-Adresse, der Nachrichteninhalt und technische Metadaten
                verarbeitet. Der Anbieter speichert übermittelte Nachrichten nach
                eigenen Angaben für bis zu 30 Tage in seinem Versandprotokoll. Mit
                dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach
                Art. 28 DSGVO; die Übermittlung in die Vereinigten Staaten erfolgt
                auf Grundlage der Standardvertragsklauseln nach Art. 46 Abs. 2
                lit. c DSGVO.
              </p>
              <p className="mt-2">
                Ihre Anfrage wird ausschließlich als E-Mail an unser Postfach
                zugestellt. Eine Speicherung in einer Datenbank oder einem
                sonstigen dauerhaften Speicher auf dieser Website findet nicht
                statt.
              </p>
              <p className="mt-2">
                Ihre Daten werden nicht an sonstige Dritte weitergegeben. Wir
                löschen Ihre Anfrage spätestens sechs Monate nach Abschluss der
                Bearbeitung aus unserem Postfach, soweit keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen. Kommt es zu einem
                Vertragsschluss, gelten die handels- und steuerrechtlichen
                Aufbewahrungsfristen.
              </p>
              {/*
                Der frühere Satz empfahl aktiv, Fahrzeugscheine per E-Mail zu
                schicken. Unverschlüsselte E-Mail ist dafür der falsche Kanal —
                der Fahrzeugschein enthält Halterdaten. Der Hinweis bleibt, aber
                ohne Empfehlung und mit dem Rat zur Schwärzung.
              */}
              <p className="mt-2">
                Über das Formular nehmen wir bewusst keine Dateien entgegen.
                Sollten für die Bearbeitung Unterlagen wie ein Fahrzeugschein
                erforderlich sein, sprechen wir Sie gezielt an und stimmen einen
                geeigneten Übermittlungsweg ab. Bitte senden Sie solche Dokumente
                nicht unaufgefordert per unverschlüsselter E-Mail und schwärzen
                Sie darin alle Angaben, die für die Bewertung nicht benötigt
                werden.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                6. Kontaktaufnahme per E-Mail und Telefon
              </h2>
              <p>
                Wenn Sie uns unmittelbar anrufen oder eine E-Mail schreiben,
                verarbeiten wir die dabei anfallenden Angaben — Ihren Namen, Ihre
                Rufnummer oder E-Mail-Adresse und den Inhalt Ihrer Nachricht —
                allein zur Beantwortung Ihres Anliegens. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. b DSGVO, soweit es um die Anbahnung oder
                Durchführung eines Vertrags geht, sonst Art. 6 Abs. 1 lit. f
                DSGVO aufgrund unseres Interesses an der Beantwortung von
                Anfragen.
              </p>
              <p className="mt-2">
                Unser E-Mail-Postfach wird von der {processors.mailbox.name},{' '}
                {processors.mailbox.address}, betrieben. Der Anbieter verarbeitet
                dabei die Inhalte und Metadaten der eingehenden Nachrichten in
                unserem Auftrag; ein Vertrag zur Auftragsverarbeitung nach Art. 28
                DSGVO besteht. Die Verarbeitung findet in der Europäischen Union
                statt.
              </p>
              <p className="mt-2">
                Auch diese Nachrichten löschen wir spätestens sechs Monate nach
                Abschluss der Bearbeitung, soweit keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">7. Cookies</h2>
              <p>
                Diese Website verwendet keine Cookies zu Analyse- oder
                Marketingzwecken und bindet keine externen Dienste ein, die vor
                einer Einwilligung Daten übertragen. Sollten künftig
                Analyse-Tools, Karten, Videos oder vergleichbare Technologien
                eingesetzt werden, wird diese Erklärung ergänzt und, soweit nach
                § 25 TDDDG erforderlich, vorab eine Einwilligung eingeholt.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                8. Externe Links
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
                9. Ihre Rechte
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
                Datenschutz-Aufsichtsbehörde zu. Für uns zuständig ist{' '}
                {supervisoryAuthority.name}, {supervisoryAuthority.address}.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                10. SSL-/TLS-Verschlüsselung
              </h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen durchgehend eine
                SSL-/TLS-Verschlüsselung zur Übertragung vertraulicher Inhalte,
                etwa Ihrer Anfragen über die Formulare.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-on-surface mb-2">
                11. Stand dieser Erklärung
              </h2>
              <p>{privacyPolicyDate}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
