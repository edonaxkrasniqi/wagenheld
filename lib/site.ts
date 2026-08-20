export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.automobilzentrum-wagenheld.de'

/** Anbieterdaten aus dem Trello-Board, Liste 🧹 Geklärt. Verbindlich. */
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
} as const
