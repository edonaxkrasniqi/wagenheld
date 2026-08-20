import type { Review, GoogleRating } from '@/lib/types'

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Michael S.',
    rating: 5,
    body: 'Habe meinen Audi hier gekauft. Von der ersten Besichtigung bis zur Übergabe ein absolut professioneller Service. Sehr empfehlenswert!',
    timeAgo: 'Vor 2 Wochen',
  },
  {
    id: '2',
    author: 'Claudia B.',
    rating: 5,
    body: 'Faire Inzahlungnahme meines alten Wagens. Keine versteckten Kosten, ehrliche Beratung. Gerne wieder!',
    timeAgo: 'Vor einem Monat',
  },
  {
    id: '3',
    author: 'Thomas H.',
    rating: 4,
    body: 'Tolle Auswahl an Fahrzeugen. Das Team ist kompetent und nimmt sich Zeit für alle Fragen. Zulassung ging super schnell.',
    timeAgo: 'Vor 3 Monaten',
  },
]

export const googleRating: GoogleRating = {
  score: 4.9,
  count: 182,
  reviewsUrl: '#',
  logoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ3Jb1ZRarWCcU1_gc22q4CnoMK8i8e4fRrMHljIVND2S3goGW8kC0YXdy2ByTlJfcd8B_8lkdiCrkY13I0MtpZD9kCIburl8LDgr_wHSRKeCeVagJliqUZiNPSCnJmLc5ryFMRsbBiGytcleJFghK9RcYYB6KVHPHiUMRhr1L7QyWiCf-jZXYnvp-sU6f20GWN2s_mbPKQSTT-tp-YAQhmeYUsKlya7UozlztlVaf5eNY3_5Roxy63Q',
}
