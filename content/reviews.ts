import type { Review, GoogleRating } from '@/lib/types'

/**
 * ACHTUNG — hier standen erfundene Kundenbewertungen.
 *
 * "Michael S.", "Claudia B.", "Thomas H." und die Bewertung 4,9 aus 182
 * Stimmen waren frei erfunden. Das ist keine Kleinigkeit: Anhang Nr. 23b zu
 * § 3 Abs. 3 UWG verbietet es ausdrücklich, gefälschte Bewertungen zu
 * veröffentlichen oder veröffentlichen zu lassen. Es ist eine sogenannte
 * Per-se-Verbotshandlung, also ohne jede Abwägung unzulässig, abmahnfähig und
 * seit 2022 auch bußgeldbewehrt.
 *
 * Deshalb ist die Sektion aus content/pageConfig.ts entfernt und dieses Array
 * leer. Wieder aktivieren erst, wenn es echte Bewertungen gibt:
 *
 * 1. Google-Business-Profil des Automobilzentrums verknüpfen und die
 *    Bewertungen über die Places API live einlesen, ODER
 * 2. Einzelne echte Bewertungen mit Einwilligung der Verfasser übernehmen
 *    und die Quelle nennen (§ 5b Abs. 3 UWG: Wer mit Bewertungen wirbt, muss
 *    angeben, ob und wie er ihre Echtheit sicherstellt).
 *
 * Das Google-Logo wurde zusätzlich direkt von googleusercontent.com geladen.
 * Das ist Hotlinking auf fremde Infrastruktur und markenrechtlich heikel.
 */
export const reviews: Review[] = []

export const googleRating: GoogleRating | null = null
