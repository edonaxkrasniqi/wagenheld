import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { company } from '@/lib/site'
import { privacyPolicyHtml, privacyPolicyStand } from '@/content/datenschutzKanzlei'

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${company.shortName}`,
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/datenschutz' },
}

/**
 * Datenschutzerklärung der IT-Recht Kanzlei — Entscheidung des Kunden vom
 * 11.10.2026. Der Text kommt unverändert aus `content/datenschutzKanzlei.ts`;
 * diese Seite liefert nur Rahmen und Typografie.
 *
 * Wichtig für jede spätere Änderung an der Website: Kommt ein Dienst hinzu
 * oder fällt einer weg (z. B. Hosting, Formularversand, Karten, Analyse), muss
 * die Erklärung im Kanzlei-Portal angepasst und hier neu eingesetzt werden.
 * Siehe GO-LIVE.md, Abschnitt D.
 *
 * `dangerouslySetInnerHTML` ist hier vertretbar: Der Inhalt ist eine fest im
 * Repository liegende Zeichenkette, keine Nutzereingabe und kein Abruf zur
 * Laufzeit.
 */
export default function DatenschutzPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main id="inhalt" tabIndex={-1} className="bg-surface-lowest pt-16 flex-1 outline-none">
        <div className="max-w-[760px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <div
            className={[
              'text-on-surface-variant leading-relaxed break-words',
              '[&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-on-surface [&_h1]:mb-10',
              '[&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:mt-10 [&_h2]:mb-2',
              '[&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1',
              '[&_b]:text-on-surface [&_a]:underline [&_a:hover]:text-gold-ink',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
          />

          <p className="mt-12 text-sm text-on-surface-variant">
            Stand: {privacyPolicyStand} ·{' '}
            <a
              href="https://www.it-recht-kanzlei.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold-ink"
            >
              © IT-Recht Kanzlei
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
