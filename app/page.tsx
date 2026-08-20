import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { Inventory } from '@/components/sections/Inventory'
import { Reviews } from '@/components/sections/Reviews'
import { VehicleSellingForm } from '@/components/sections/VehicleSellingForm'
import { About } from '@/components/sections/About'
import { ContactBar } from '@/components/sections/ContactBar'
import { Footer } from '@/components/sections/Footer'
import { pageConfig } from '@/content/pageConfig'
import type { SectionId } from '@/lib/types'

const sectionComponents: Record<SectionId, () => React.ReactNode> = {
  header: Header,
  hero: Hero,
  benefits: Benefits,
  inventory: Inventory,
  reviews: Reviews,
  vehicleSellingForm: VehicleSellingForm,
  about: About,
  contactBar: ContactBar,
  footer: Footer,
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {pageConfig.sections.map(({ id }) => {
        const Section = sectionComponents[id]
        return <Section key={id} />
      })}
    </div>
  )
}
