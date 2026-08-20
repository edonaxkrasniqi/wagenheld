import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { StarRating } from '@/components/ui/StarRating'
import { Reveal } from '@/components/ui/Reveal'
import { reviews, googleRating } from '@/content/reviews'

export function Reviews() {
  return (
    <section className="bg-surface-low border-y border-outline-variant">
      <Reveal className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center mb-14">
          <SectionLabel className="mb-4">Kundenstimmen</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Das sagen unsere Kunden
          </h2>
          <div className="flex items-center gap-3">
            <Image
              src={googleRating.logoUrl}
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <StarRating rating={googleRating.score} />
            <Link
              href={googleRating.reviewsUrl}
              className="text-sm font-semibold text-on-surface-variant hover:text-gold transition-colors"
            >
              {googleRating.score} ({googleRating.count} Bewertungen)
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
