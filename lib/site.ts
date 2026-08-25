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
