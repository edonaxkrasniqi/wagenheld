import type { PageConfig } from '@/lib/types'

export const pageConfig: PageConfig = {
  sections: [
    { id: 'header' },
    { id: 'hero' },
    { id: 'benefits' },
    // Bestand und Ankauf stehen nebeneinander in einem Abschnitt.
    { id: 'inventoryAndSelling' },
    // 'reviews' ist bewusst deaktiviert — siehe content/reviews.ts.
    // Erst wieder aufnehmen, wenn echte Bewertungen vorliegen.
    { id: 'about' },
    { id: 'contactBar' },
    { id: 'footer' },
  ],
}
