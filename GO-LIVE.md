# Go-Live-Checkliste

Was vor dem Schalten der Seite erledigt sein muss. Stand: 21.08.2026.

Die Liste hat drei Teile: **A** sind Angaben, die nur vom Kunden kommen können —
ohne sie darf die Seite nicht online. **B** ist Infrastruktur (Domain, E-Mail,
Hosting). **C** ist Arbeit am Code, die noch offen ist.

> Rechtliche Einordnungen hier sind Hinweise auf bekannte Fallstricke, keine
> Rechtsberatung. Impressum, Datenschutzerklärung und Garantiebedingungen vor
> dem Livegang vom Kunden bestätigen und im Zweifel anwaltlich prüfen lassen.

---

## A · Angaben, die vom Kunden kommen müssen

Jede dieser Zeilen steht aktuell als markierter Platzhalter auf der Seite. Sie
sind bewusst sichtbar und nicht mit erfundenen Werten gefüllt.

### A1 · Blockiert den Livegang

- [ ] **Vor- und Nachnamen aller vertretungsberechtigten Gesellschafter**
      Eine GbR muss ihre Gesellschafter nennen; der Firmenname allein genügt
      nach § 5 DDG nicht. → `app/impressum/page.tsx`

- [ ] **Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV**
      Name eines Gesellschafters, Anschrift wie im Impressum.
      → `app/impressum/page.tsx`

- [ ] **USt-IdNr.** — oder die ausdrückliche Auskunft, dass keine existiert.
      Liegt keine vor, wird der Abschnitt **ersatzlos gestrichen**, nicht leer
      gelassen. → `app/impressum/page.tsx`

- [ ] **Ist die GbR als eGbR im Gesellschaftsregister eingetragen?**
      Wenn ja: Registergericht und Nummer (GsR …). Wenn nein: Abschnitt
      streichen. Eine GbR steht **nicht** im Handelsregister — der Abschnitt
      dazu wurde bereits entfernt. → `app/impressum/page.tsx`

- [ ] **Hosting-Anbieter mit vollem Namen und Anschrift**, plus abgeschlossener
      Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Hängt an B3.
      → `app/datenschutz/page.tsx`

- [ ] **Löschfrist für Formularanfragen bestätigen.** Vorschlag: 6 Monate.
      → `app/datenschutz/page.tsx`

### A2 · Sollte vor dem Livegang geklärt sein

- [ ] **Öffnungszeiten** — oder die ausdrückliche Auskunft „nur nach
      Vereinbarung". Aktuell steht dazu nirgends etwas, weil geraten nicht
      infrage kommt. Die Struktur ist vorbereitet; sobald die Zeiten da sind,
      erscheinen Kachel und strukturierte Daten automatisch.

- [ ] **Garantie: Garantiegeber, Deckungsumfang und Kosten.**
      Auf der Seite steht „Optional bis 36 Monate". § 479 BGB verlangt, dass
      bei einer Garantieaussage Inhalt und Bedingungen genannt werden. Bis die
      Angaben vorliegen, ist die Kachel angreifbar — im Zweifel vorher auf
      „Garantieverlängerung optional möglich – Details auf Anfrage" kürzen.

- [ ] **„Aktuelle Inspektion nach Herstellervorgabe" gegenprüfen.**
      Der Satz ist eine Zusage. Er muss für jedes verkaufte Fahrzeug stimmen,
      sonst ist er nach § 5 UWG angreifbar.

- [ ] **Google-Business-Link**, falls vorhanden. Nur dann kann eine
      Bewertungssektion überhaupt wieder aufgebaut werden — mit echten
      Bewertungen und Quellenangabe.

---

## B · Infrastruktur

### B1 · Domain

- [ ] **Aktueller Registrar und Auth-Code** für `automobilzentrum-wagenheld.de`
      besorgen.
- [ ] **MX-Einträge vor dem Umzug sichern.** Die E-Mail-Zustellung an
      `info@automobilzentrum-wagenheld.de` darf während der Umstellung **nicht**
      ausfallen.
- [ ] DNS auf das Hosting umstellen (A/AAAA bzw. CNAME).
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

- [ ] **SPF, DKIM und DMARC** für die Versanddomain setzen. Ohne das landen die
      Anfragen im Spam — oder gar nicht.
- [ ] **Auftragsverarbeitungsvertrag mit Resend** abschließen. Der Dienst steht
      bereits namentlich in der Datenschutzerklärung.
- [ ] **Testanfrage abschicken und den Eingang dokumentieren** — beide
      Anfragearten, Kauf und Verkauf.

> Ohne `RESEND_API_KEY` gehen Anfragen **nicht** verloren, sondern das Formular
> meldet dem Absender ehrlich, dass die Übermittlung fehlgeschlagen ist, und
> verweist auf Telefon und E-Mail. Trotzdem: vor dem Livegang einrichten.

### B3 · Hosting

- [ ] **Anbieter festlegen** und den AV-Vertrag abschließen. Serverstandort und
      AV-Vertrag fließen direkt in die Datenschutzerklärung (A1).
- [ ] **HTTPS erzwingen, HSTS setzen.**
- [ ] Environment-Variablen aus B1 und B2 hinterlegen.

---

## C · Offene Arbeit am Code

- [ ] **Reveal-Animation von JavaScript entkoppeln.** Der Inhalt startet
      unsichtbar und wird per JavaScript eingeblendet; ohne JavaScript bleibt
      die halbe Seite dauerhaft leer. Der Versteckzustand gehört in CSS
      innerhalb von `prefers-reduced-motion: no-preference`, dazu eine
      `<noscript>`-Entsperrung. Der Linter meldet die Stelle bereits.
      *(Sichtbarkeit darf nie von JavaScript abhängen — die Animation ist
      Zugabe, keine Voraussetzung.)*

- [ ] **Formularfehler pro Feld statt einer Sammelmeldung.** Aktuell erscheint
      nur die erste Fehlermeldung über dem Absendeknopf. Nötig:
      `aria-describedby` am jeweiligen Feld, `aria-invalid`, und der Fokus
      springt auf das erste fehlerhafte Feld.

- [ ] **Deploy-Guard für das Impressum.** Ein Produktions-Build soll abbrechen,
      solange die Gesellschafter-Angabe leer ist. Lieber ein rotes Build als
      ein unvollständiges Impressum online.

- [ ] **Eigene 404-Seite** mit Footer und Impressum-Link. Aktuell greift die
      Standardseite von Next.js — ohne Footer, damit ohne Impressum in einem
      Klick.

- [ ] **Bilder in modernen Formaten ausliefern** (AVIF/WebP). Die Hero-Aufnahme
      wiegt als PNG gut 1,5 MB.

- [ ] **Barrierefreiheits-Durchlauf über alle Seiten und Zustände** — nicht nur
      die Startseite: Fehlerzustände der Formulare, Fokus, Hover, mobiles Menü.
      Ziel: axe ohne kritische oder ernste Befunde.

- [ ] **Lighthouse mobil**: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

- [ ] **Datum „Stand" in der Datenschutzerklärung** beim Livegang eintragen.

---

## D · Abnahme unmittelbar vor dem Schalten

- [ ] Impressum vollständig, vom Kunden **schriftlich** bestätigt
- [ ] Datenschutzerklärung vollständig, Hosting-Anbieter eingetragen
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
| Link zur OS-Plattform | Plattform seit 20.07.2025 abgeschaltet |
| Fahrzeugschein-Upload | personenbezogene Daten; braucht eigenes Konzept |
| „15 Jahre Erfahrung" | Kundenangabe ist „über 10 Jahre" |
