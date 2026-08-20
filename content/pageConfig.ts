import type { PageConfig } from '@/lib/types'

export const pageConfig: PageConfig = {
  sections: [
    { id: 'header' },
    { id: 'hero' },
    { id: 'benefits' },
    { id: 'inventory' },
    // 'reviews' ist bewusst deaktiviert — siehe content/reviews.ts.
    // Erst wieder aufnehmen, wenn echte Bewertungen vorliegen.
    { id: 'vehicleSellingForm' },
    { id: 'about' },
    { id: 'contactBar' },
    { id: 'footer' },
  ],
}
