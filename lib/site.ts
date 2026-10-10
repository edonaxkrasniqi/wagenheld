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

/**
 * Stand der Datenschutzerklärung. Bei jeder inhaltlichen Änderung mit
 * hochziehen — die Angabe ist Teil der Informationspflicht nach Art. 13 DSGVO
 * und eine veraltete ist schlechter als gar keine.
 */
export const privacyPolicyDate = '10. Oktober 2026'

/**
 * Auftragsverarbeiter und sonstige Dritte, die auf dieser Seite tatsächlich
 * Daten verarbeiten. Wer hier steht, muss im Code vorkommen — und wer im Code
 * vorkommt, muss hier stehen. Das ist der Abgleich aus der Go-Live-Checkliste,
 * Abschnitt D.
 *
 * Firmierungen und Anschriften bitte nicht aus dem Gedächtnis pflegen, sondern
 * aus dem jeweiligen Impressum bzw. AV-Vertrag übernehmen.
 */
export const processors = {
  /** Hosting und Auslieferung der Seite (Cloudflare Workers). */
  hosting: {
    name: 'Cloudflare, Inc.',
    address: '101 Townsend Street, San Francisco, CA 94107, USA',
  },
  /** Versandweg der Formularanfragen. Resend ist die Marke, nicht die Firma. */
  mailDelivery: {
    name: 'Plus Five Five, Inc.',
    brand: 'Resend',
    address: '2261 Market Street #5039, San Francisco, CA 94114, USA',
  },
  /** Postfach, in dem die Anfragen ankommen und liegen bleiben. */
  mailbox: {
    name: 'IONOS SE',
    address: 'Elgendorfer Straße 57, 56410 Montabaur, Deutschland',
  },
} as const

/**
 * Zuständige Aufsichtsbehörde. Anschrift seit dem 22.12.2025 geändert — die
 * frühere Lautenschlagerstraße 20 ist überholt.
 */
export const supervisoryAuthority = {
  name: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg',
  address: 'Heilbronner Straße 35, 70191 Stuttgart',
} as const

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

/**
 * Anbieter des Messengers hinter dem WhatsApp-Link. Kein Auftragsverarbeiter
 * im engeren Sinn, steht aber namentlich in der Datenschutzerklärung (Abschnitt
 * WhatsApp) — und muss deshalb hier gepflegt werden, nicht in der Seite.
 */
export const messenger = {
  name: 'WhatsApp Ireland Limited',
  address: 'Merrion Road, Dublin 4, D04 X2K5, Irland',
  parent: 'Meta Platforms, Inc.',
  privacyUrl: 'https://www.whatsapp.com/legal/privacy-policy-eea',
} as const
