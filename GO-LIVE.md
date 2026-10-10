# Go-Live-Checkliste

Was vor dem Schalten der Seite erledigt sein muss. Stand: 11.10.2026.

Die Liste hat drei Teile: **A** sind Angaben, die nur vom Kunden kommen können —
ohne sie darf die Seite nicht online. **B** ist Infrastruktur (Domain, E-Mail,
Hosting). **C** ist Arbeit am Code, die noch offen ist.

> Rechtliche Einordnungen hier sind Hinweise auf bekannte Fallstricke, keine
> Rechtsberatung. Impressum, Datenschutzerklärung und Garantiebedingungen vor
> dem Livegang vom Kunden bestätigen und im Zweifel anwaltlich prüfen lassen.

---

## A · Angaben, die vom Kunden kommen müssen

Was hier noch offen ist, steht als markierter Platzhalter auf der Seite. Diese
Platzhalter sind bewusst sichtbar und nicht mit erfundenen Werten gefüllt.

### A1 · Blockiert den Livegang

- [ ] **Auftragsverarbeitungsvertrag mit Cloudflare** sicherstellen. Stand
      10/2026: Der DPA ist Bestandteil des Self-Serve Subscription Agreement
      (Ziffer 6.1, „incorporated by reference") und gilt mit Annahme der AGB.
      Aktuelle Fassung als PDF von cloudflare.com/dpa ablegen. Das Konto
      sollte auf den **Kunden** laufen (Vertragspartner), wir als Mitglied.
      → `lib/site.ts` (`processors.hosting`), ausgegeben in
      `app/datenschutz/page.tsx`

- [ ] **Auftragsverarbeitungsvertrag mit IONOS** für das Postfach prüfen.
      Seit 19.07.2022 Teil der IONOS-AGB; bei älteren Verträgen gesondert
      abschließen: Mein Konto → Datenschutz & Privatsphäre → Vereinbarung zur
      Auftragsverarbeitung (AVV). Steht ebenfalls schon in der Erklärung.
      → `lib/site.ts` (`processors.mailbox`)

### A1-erledigt · Vom Kunden geliefert und eingebaut

Die Angaben stehen jetzt in `lib/site.ts` und werden von dort aus in Impressum,
Datenschutzerklärung und Footer gelesen. Wer sie ändert, ändert sie dort — nicht
in den Seiten.

- [x] **Vertretungsberechtigter Gesellschafter:** Arianit Krasniqi.
      → `lib/site.ts`, ausgegeben in `app/impressum/page.tsx`

- [x] **Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:** Arianit
      Krasniqi, Anschrift wie im Impressum. → `app/impressum/page.tsx`

- [x] **USt-IdNr.:** DE462951299 (§ 27a UStG, exakt ohne Leerzeichen).
      → `lib/site.ts`

- [x] **Gesellschaftsregister:** Die GbR ist **nicht** eingetragen. Der
      Abschnitt wurde ersatzlos gestrichen und darf nicht zurückkehren.

- [x] **Löschfrist für Formularanfragen:** sechs Monate nach Abschluss der
      Bearbeitung. Steht als Zusage in `app/datenschutz/page.tsx`. **Technisch
      nicht erzwingbar** — das Formular speichert nichts, es versendet nur eine
      E-Mail. Die Einhaltung im Postfach ist eine organisatorische Aufgabe,
      siehe B2.

- [x] **Finanzierung:** läuft über die Partnerbank Bank11. Mehr steht nicht auf
      der Seite und darf auch nicht dazukommen — siehe „Ausdrücklich nicht
      umsetzen". → `content/benefits.ts`

### A2 · Sollte vor dem Livegang geklärt sein

- [x] **Öffnungszeiten** eingebaut am 10.10.2026: Mo–Fr 9–18 Uhr, Sa 9–13 Uhr,
      So geschlossen — aus dem vom Betrieb gepflegten Google-Unternehmensprofil.
      Kontaktleiste, Footer und strukturierte Daten lesen aus `lib/site.ts`
      (`openingHours`). Vom Kunden nicht gesondert bestätigt; ändert er sie
      bei Google, hier nachziehen.

- [x] **WhatsApp-Kontakt** eingebaut am 10.10.2026: `wa.me/491791596072`
      (dieselbe Mobilnummer). Link, kein Widget — überträgt nichts vor dem
      Klick. Datenschutzerklärung Ziffer 7. **Offen beim Kunden:** dass er
      WhatsApp Business (App) nutzt, wie im Text angegeben.

- [ ] **Garantie: Garantiegeber, Deckungsumfang und Kosten.**
      Auf der Seite steht „Optional bis 36 Monate". § 479 BGB verlangt, dass
      bei einer Garantieaussage Inhalt und Bedingungen genannt werden. Bis die
      Angaben vorliegen, ist die Kachel angreifbar — im Zweifel vorher auf
      „Garantieverlängerung optional möglich – Details auf Anfrage" kürzen.

- [ ] **„Aktuelle Inspektion nach Herstellervorgabe" gegenprüfen.**
      Der Satz ist eine Zusage. Er muss für jedes verkaufte Fahrzeug stimmen,
      sonst ist er nach § 5 UWG angreifbar.

- [ ] **Bewertungen:** Ein Google-Unternehmensprofil existiert (5,0 aus 23
      Rezensionen, Stand 10.10.2026). Eine Bewertungssektion bleibt trotzdem
      aus — Rezensionstexte dürfen nicht einfach übernommen werden, und eine
      fest eingetragene Sternezahl veraltet. Falls gewünscht: nur als Link
      „Bewertungen auf Google ansehen" oder über die Places API mit
      Quellenangabe (§ 5b Abs. 3 UWG).

---

## B · Infrastruktur

### B1 · Domain

- [x] **Registrar ermittelt:** IONOS (Nameserver `ns10xx.ui-dns.{org,biz,com,de}`).
      Die Domain bleibt dort registriert — es wechseln **nur die Nameserver**.
      Ein Registrar-Umzug findet nicht statt, ein **Auth-Code wird dafür nicht
      gebraucht**.

      > Falls doch je ein Auth-Code angefordert wird: Er gehört **nirgendwo**
      > in dieses Repository — nicht in den Quellcode, nicht in eine
      > eingecheckte `.env`, nicht ins Frontend, nicht in diese Datei. Er ist
      > das Passwort zur Domain. Wurde er über einen unsicheren Kanal
      > verschickt (Messenger, E-Mail, Screenshot), im IONOS-Konto sofort neu
      > erzeugen.
- [ ] **DNS-Einträge bei IONOS vollständig abschreiben bzw. Screenshots**,
      bevor irgendetwas umgestellt wird. IONOS bietet für Domain-DNS **keinen
      Zonen-Export** (der „Domain-Export" liefert nur Stammdaten). Stand
      10.10.2026 von außen sichtbar:

      | Typ | Name | Wert |
      |---|---|---|
      | MX | @ | `mx00.ionos.de`, `mx01.ionos.de` (beide Prio 10) |
      | TXT | @ | `v=spf1 include:_spf-eu.ionos.com ~all` |
      | CNAME | `_dmarc` | `dmarc.ionos.de` (löst auf `v=DMARC1; p=none;`) |
      | CNAME | `autodiscover` | `adsredir.ionos.info` |
      | CNAME | `s1-ionos._domainkey` | `s1.dkim.ionos.com` (DKIM) |
      | CNAME | `s2-ionos._domainkey` | `s2.dkim.ionos.com` (DKIM) |
      | A | @ | `217.160.0.69` (alte IONOS-Seite, entfällt mit dem Livegang) |
      | AAAA | @ | `2001:8d8:100f:f000::200` (dito) |

      Die DKIM-Selektoren sind damit gefunden. Trotzdem im IONOS-Panel gegen
      die Liste prüfen — Subdomains, die nur dort stehen, sieht man von außen
      nicht. DNSSEC ist nicht aktiv (kein DS-Record), Domain Guard prüfen.
- [x] ~~TTL senken~~ — entfällt. Beim Nameserverwechsel zählt die TTL der
      Delegation in der .de-Zone, nicht die der eigenen Einträge. Das
      Sicherheitsnetz ist eine vollständige, geprüfte Cloudflare-Zone **vor**
      der Umstellung; prüfen per `dig @<cloudflare-ns>` und nast.denic.de.
- [ ] Zone bei Cloudflare anlegen, alle Einträge **gegen die Liste prüfen** —
      der Quick Scan findet MX und SPF zuverlässig, die DKIM-CNAMEs
      `s1-ionos`/`s2-ionos` und `_dmarc` nicht.
- [ ] **Alle Mail-Einträge auf „DNS only" (graue Wolke)** stellen. Proxied
      zerstört die Zustellung.
- [ ] Erst danach die Nameserver bei IONOS auf Cloudflare umstellen.
- [ ] `www` als Custom Domain an den Worker hängen, Apex per Weiterleitungsregel
      auf `www` (oder umgekehrt — aber einheitlich mit dem Canonical).
- [ ] Nach der Umstellung: E-Mail-Empfang **testen und dokumentieren**.
- [ ] `NEXT_PUBLIC_SITE_URL` auf die endgültige Domain setzen — davon hängen
      Sitemap, robots.txt, Canonical-Links und die Open-Graph-URLs ab.

### B2 · E-Mail

- [ ] **Postfach `info@automobilzentrum-wagenheld.de` muss existieren und
      empfangen.** Es steht im Impressum, im Footer, in der
      Datenschutzerklärung und ist der Empfänger aller Formularanfragen.
- [ ] **Versanddienst einrichten.** Das Formular verschickt über Resend
      (`resend.com`). Nötig sind ein Konto, eine dort **verifizierte
      Absenderdomain** und diese Variablen:

      RESEND_API_KEY=…
      LEAD_FROM_EMAIL="Automobilzentrum Wagenheld <leads@automobilzentrum-wagenheld.de>"
      LEAD_TO_EMAIL=info@automobilzentrum-wagenheld.de

- [ ] **Resend auf einer Subdomain betreiben**, z. B.
      `send.automobilzentrum-wagenheld.de`. Grund: Es darf pro Name nur **einen**
      SPF-TXT-Eintrag geben. Der bestehende IONOS-SPF bleibt so unangetastet;
      ein zweiter SPF-Eintrag auf der Hauptdomain macht beide ungültig.
- [ ] **SPF, DKIM und DMARC** für diese Versand-Subdomain setzen. Ohne das
      landen die Anfragen im Spam — oder gar nicht.
- [ ] `LEAD_FROM_EMAIL` auf die verifizierte Subdomain anpassen, etwa
      `Automobilzentrum Wagenheld <leads@send.automobilzentrum-wagenheld.de>`.
- [ ] **DMARC härten:** aktuell `p=none`. Nach einer Beobachtungsphase mit
      Reports auf `quarantine`, später gegebenenfalls `reject`.
- [ ] **Auftragsverarbeitungsvertrag mit Resend** abschließen. Der Dienst steht
      bereits namentlich in der Datenschutzerklärung.
- [ ] **Testanfrage abschicken und den Eingang dokumentieren** — beide
      Anfragearten, Kauf und Verkauf. Beim Verkauf zusätzlich einmal mit
      „Sonstige Marke": in der E-Mail muss die frei eingetragene Marke stehen,
      nicht der Auswahlwert.

- [ ] **Löschroutine für das Postfach festlegen und dokumentieren.**
      Die Datenschutzerklärung sagt zu, dass Anfragen spätestens **sechs
      Monate** nach Abschluss der Bearbeitung gelöscht werden. Die Website
      speichert nichts, also greift die Frist ausschließlich im Postfach
      `info@automobilzentrum-wagenheld.de` — inklusive Ordner „Gesendet",
      Archiv und Papierkorb. Nötig ist eine feste Zuständigkeit und ein
      wiederkehrender Termin (z. B. quartalsweise). Ohne das steht die Zusage
      in der Erklärung ohne Deckung da.

> Ohne `RESEND_API_KEY` gehen Anfragen **nicht** verloren, sondern das Formular
> meldet dem Absender ehrlich, dass die Übermittlung fehlgeschlagen ist, und
> verweist auf Telefon und E-Mail. Trotzdem: vor dem Livegang einrichten.

### B3 · Hosting — Cloudflare Workers

Der Anbieter steht fest: **Cloudflare Workers**, betrieben über den
Cloudflare-Account der Agentur. Der Build läuft über `@opennextjs/cloudflare`
(`npm run deploy`); Konfiguration in `wrangler.jsonc` und `open-next.config.ts`.

- [ ] **Zone anlegen** und die Nameserver bei IONOS umstellen (siehe B1). Ohne
      aktive Cloudflare-Zone lässt sich keine Custom Domain an den Worker
      hängen — für die Apex-Domain gibt es keinen CNAME-Weg.
- [ ] **HTTPS erzwingen** (SSL/TLS → Edge Certificates → Always Use HTTPS) und
      **HSTS** dort aktivieren. Bewusst nicht in `next.config.ts`: zwei Stellen
      für denselben Header laufen auseinander.
- [ ] SSL/TLS-Modus auf **Full (strict)**.
- [ ] **Bot Fight Mode ausgeschaltet lassen.** Er setzt das Cookie `__cf_bm`.
      Ziffer 8 der Datenschutzerklärung sagt zu, dass keine Cookies zu
      Analyse- oder Marketingzwecken gesetzt werden und keine Dienste Daten
      vor einer Einwilligung übertragen; tatsächlich setzt die Seite heute
      gar keine Cookies. Das soll so bleiben — jedes neue Cookie gehört
      vorher in die Erklärung.
- [ ] **Web Analytics nur ohne Cookies** einsetzen — und dann in die
      Datenschutzerklärung aufnehmen. Im Zweifel weglassen.
- [ ] **Rate-Limiting-Regel** für die Formular-POSTs auf `/` anlegen
      (Security → WAF → Rate limiting rules). Nach IP zählen, **nicht** nach
      `cf.unique_visitor_id` — das setzt das Cookie `_cfuvid`.
- [ ] Environment-Variablen aus B1 und B2 als **Secrets** hinterlegen:
      `npx wrangler secret put RESEND_API_KEY`. `LEAD_FROM_EMAIL`,
      `LEAD_TO_EMAIL` und `NEXT_PUBLIC_SITE_URL` gehören als `vars` in
      `wrangler.jsonc` — `NEXT_PUBLIC_SITE_URL` wird zur Buildzeit
      eingebacken, muss also **vor** dem Build stimmen.

---

## C · Offene Arbeit am Code

- [x] **Reveal-Animation von JavaScript entkoppeln.** Erledigt am 26.08.2026:
      Der Versteckzustand liegt jetzt in `app/globals.css` unter
      `[data-reveal]`, ausschließlich innerhalb von
      `prefers-reduced-motion: no-preference`; die `<noscript>`-Entsperrung
      steht in `app/layout.tsx`. `components/ui/Reveal.tsx` setzt keinen State
      mehr, sondern nur noch ein Attribut — damit ist auch der Lint-Fehler
      `react-hooks/set-state-in-effect` weg.

      *(Ursprüngliche Beschreibung:)*
      **Reveal-Animation von JavaScript entkoppeln.** Der Inhalt startet
      unsichtbar und wird per JavaScript eingeblendet; ohne JavaScript bleibt
      die halbe Seite dauerhaft leer. Der Versteckzustand gehört in CSS
      innerhalb von `prefers-reduced-motion: no-preference`, dazu eine
      `<noscript>`-Entsperrung. Der Linter meldet die Stelle bereits.
      *(Sichtbarkeit darf nie von JavaScript abhängen — die Animation ist
      Zugabe, keine Voraussetzung.)*

- [x] **Formularfehler pro Feld statt einer Sammelmeldung.** Erledigt am 10.10.2026: Meldung am Feld (`aria-describedby`, `aria-invalid`, roter Rahmen), Fokus aufs erste fehlerhafte Feld, Eingaben bleiben erhalten, Statusmeldung als dauerhafte Live-Region außerhalb des Formulars. Tests in `tests/actions.test.mjs`.
      *(Ursprünglich:)* Aktuell erscheint
      nur die erste Fehlermeldung über dem Absendeknopf. Nötig:
      `aria-describedby` am jeweiligen Feld, `aria-invalid`, und der Fokus
      springt auf das erste fehlerhafte Feld.

- [ ] **Deploy-Guard für das Impressum.** Ein Produktions-Build soll abbrechen,
      solange die Gesellschafter-Angabe leer ist. Lieber ein rotes Build als
      ein unvollständiges Impressum online.

- [x] **Eigene 404-Seite** — erledigt am 10.10.2026, `app/not-found.tsx`. mit Footer und Impressum-Link. Aktuell greift die
      Standardseite von Next.js — ohne Footer, damit ohne Impressum in einem
      Klick.

- [x] **Bilder in modernen Formaten ausliefern** — erledigt am 10.10.2026: Quellen als WebP (Hero 18 KB statt 970 KB), `images.formats` AVIF/WebP. Nach dem ersten echten Deploy prüfen, ob die IMAGES-Bindung greift. (AVIF/WebP). Die Hero-Aufnahme
      wiegt als PNG gut 1,5 MB. Die `IMAGES`-Bindung in `wrangler.jsonc`
      übernimmt die Umrechnung auf Cloudflare — nach dem ersten Deploy mit
      Lighthouse gegenprüfen, ob sie tatsächlich greift.

- [x] **Barrierefreiheits-Durchlauf über alle Seiten und Zustände** — 10./11.10.2026 mit axe-core: 0 Verstöße auf allen Seiten, mobil und Desktop, inkl. Menü offen, Formularfehler, Kaufanfrage. — nicht nur
      die Startseite: Fehlerzustände der Formulare, Fokus, Hover, mobiles Menü.
      Ziel: axe ohne kritische oder ernste Befunde.

- [x] **Lighthouse mobil**: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. Lokal auf der Cloudflare-Runtime am 11.10.2026: 96 / 100 / 100 / 100. Nach dem Livegang auf der echten Domain wiederholen.

- [x] **Datum „Stand" in der Datenschutzerklärung** — steht als
      `privacyPolicyDate` in `lib/site.ts` (10. Oktober 2026). Bei jeder weiteren
      inhaltlichen Änderung dort hochziehen.

- [x] **Fokusfalle im mobilen Menü.** Erledigt am 10.10.2026: Tab/Shift+Tab bleiben im Dialog, Escape gibt den Fokus an „Menü“ zurück, Menüklick fokussiert den Zielabschnitt.
      *(Ursprünglich:)* Der Dialog hält den Tastaturfokus nicht;
      nach dem letzten Menüpunkt springt er in den Hintergrund. Nach Escape
      landet er auf dem Dokumentkörper statt auf dem Menü-Button.

---

## D · Abnahme unmittelbar vor dem Schalten

- [ ] `npm run lint`, `npm run typecheck`, `npm test` und `npm run build` laufen
      durch
- [ ] Impressum vollständig, vom Kunden **schriftlich** bestätigt
- [ ] Datenschutzerklärung vollständig, Hosting-Anbieter eingetragen (Stand 10.10.2026 inkl. WhatsApp und Widerspruchsrecht; `privacyPolicyDate` am Livegangstag prüfen)
- [ ] **Inkognito-Test:** Netzwerk-Tab zeigt beim ersten Seitenaufruf **keine**
      Requests an Drittdomains
- [ ] Jeder in der Datenschutzerklärung genannte Dienst existiert wirklich im
      Code — und jeder Dienst im Code steht in der Erklärung
- [ ] Formulare kommen an, Test-Absendung dokumentiert (beide Anfragearten)
- [ ] Keine erfundenen Inhalte mehr im Repo
      (`grep -rn "Michael S.\|182\|1,99\|Bestpreis\|deutschlandweit\|15 Jahre"`)
- [ ] Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] 404-Seite existiert und hat einen Footer mit Impressum
- [ ] HTTPS erzwungen, HSTS gesetzt
- [ ] Sitemap erreichbar, `robots.txt` erlaubt Indexierung
- [ ] E-Mail-Zustellung nach dem Domainumzug verifiziert

---

## Ausdrücklich **nicht** umsetzen

Bewusst entfernt oder abgelehnt. Bitte nicht „wiederherstellen", auch nicht,
wenn es die Seite überzeugender machen würde.

| Nicht umsetzen | Grund |
|---|---|
| Kundenstimmen oder Sternebewertungen ohne echte Quelle | Anhang Nr. 23b zu § 3 Abs. 3 UWG, Per-se-Verbot ohne Abwägung |
| Konkrete Zinssätze („ab 1,99 %") | § 6a PAngV, löst die Pflicht zum repräsentativen Beispiel aus |
| „Bestpreis-Garantie" oder ähnliche Superlative | Kundenwortlaut ist „fairer Preis" |
| „Zulassung deutschlandweit" | Kundenangabe ist „Raum Karlsruhe" |
| § 5 TMG im Impressum | ersetzt durch § 5 DDG |
| Handelsregister-Abschnitt | eine GbR steht dort nicht drin |
| Gesellschaftsregister-Abschnitt | diese GbR ist nicht eingetragen (Kundenauskunft) |
| Wagenheld als Bank, Kreditgeber oder Vermittler | Finanzierungen laufen über Bank11; alles Weitere ist unbelegt |
| Erlaubnis nach § 34c GewO, Aufsichtsbehörde, Vermittlerregister | vom Kunden nicht bestätigt — nicht erfinden |
| Niklas und der Grund seiner fehlenden Vertretungsberechtigung | gehört nicht auf eine öffentliche Website |
| Link zur OS-Plattform | Plattform seit 20.07.2025 abgeschaltet |
| Fahrzeugschein-Upload | personenbezogene Daten; braucht eigenes Konzept |
| „15 Jahre Erfahrung" | Kundenangabe ist „über 10 Jahre" |
