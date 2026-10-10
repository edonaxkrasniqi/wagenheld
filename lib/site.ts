export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.automobilzentrum-wagenheld.de'

/**
 * Anbieterdaten aus dem Trello-Board, Liste 🧹 Geklärt. Verbindlich.
 *
 * Diese Datei ist die einzige Quelle für Firmierung, Anschrift, Vertretung und
 * USt-IdNr. Impressum, Datenschutzerklärung, Footer und strukturierte Daten
 * lesen hier — damit die Angaben nicht an vier Stellen auseinanderlaufen.
 */
export const company = {
  legalName: 'Automobilzentrum Wagenheld GbR',
  shortName: 'Automobilzentrum Wagenheld',
  street: 'Im Schollengarten 14',
  postalCode: '76646',
  city: 'Bruchsal',
  country: 'DE',
  phone: '0179 1596072',
  phoneHref: 'tel:+491791596072',
  /**
   * WhatsApp-Kontakt auf derselben Mobilnummer. `wa.me` ist der offizielle
   * Kurzlink: Er lädt nichts, solange niemand klickt, und öffnet dann die
   * WhatsApp-App bzw. WhatsApp Web. Deshalb ist er ein Link und kein Widget —
   * ein eingebettetes Chat-Fenster würde schon beim Seitenaufruf Daten an
   * Meta übertragen und bräuchte eine Einwilligung.
   */
  whatsappHref: 'https://wa.me/491791596072',
  email: 'info@automobilzentrum-wagenheld.de',
  mobileDeUrl: 'https://home.mobile.de/AUTOMOBILZENTRUMWAGENHELDGBR',
  /**
   * Vertretungsberechtigter Gesellschafter. Eine GbR muss ihn nach § 5 DDG
   * namentlich nennen; er ist zugleich der nach § 18 Abs. 2 MStV
   * Verantwortliche. Vom Kunden bestätigt.
   */
  representative: 'Arianit Krasniqi',
  /** USt-IdNr. gemäß § 27a UStG — exakt ohne Leerzeichen. */
  vatId: 'DE462951299',
  /**
   * Finanzierungen laufen ausschließlich über diese Partnerbank. Wagenheld ist
   * weder Bank noch eigener Kreditgeber; darüber hinausgehende Aussagen zu
   * Erlaubnissen oder Aufsicht gehören nicht auf die Seite.
   */
  financePartnerBank: 'Bank11',
} as const

/*
 * Datenschutzerklärung: kommt seit dem 11.10.2026 als Kanzlei-Text aus
 * content/datenschutzKanzlei.ts. Die früher hier gepflegten Listen der
 * Auftragsverarbeiter und der Aufsichtsbehörde sind damit entfallen.
 */

/**
 * Öffnungszeiten laut Google-Unternehmensprofil, abgelesen am 10.10.2026.
 * Eine andere Quelle (kfz-romes.de) führte abweichende, offenbar veraltete
 * Zeiten — maßgeblich ist das vom Betrieb selbst gepflegte Google-Profil.
 * Ändern sich die Zeiten dort, hier nachziehen: Kontaktleiste, Footer und
 * strukturierte Daten lesen alle von dieser Liste.
 */
export const openingHours = [
  {
    label: 'Montag – Freitag',
    hours: '09:00 – 18:00 Uhr',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  {
    label: 'Samstag',
    hours: '09:00 – 13:00 Uhr',
    days: ['Saturday'],
    opens: '09:00',
    closes: '13:00',
  },
  { label: 'Sonntag', hours: 'geschlossen', days: ['Sunday'], opens: null, closes: null },
] as const

/** Kurzform für knappe Stellen wie die Kontaktleiste. */
export const openingHoursShort = 'Mo–Fr 9–18 Uhr · Sa 9–13 Uhr'
