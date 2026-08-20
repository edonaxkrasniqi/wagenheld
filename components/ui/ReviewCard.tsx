import { StarRating } from './StarRating'
import type { Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-surface-lowest p-8 border border-outline-variant flex flex-col h-full">
      <StarRating rating={review.rating} className="mb-6" />
      <blockquote className="text-base italic leading-relaxed mb-8 flex-grow">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <footer>
        <p className="font-bold text-primary">{review.author}</p>
        <p className="text-xs text-on-surface-variant mt-1">{review.timeAgo}</p>
      </footer>
    </article>
  )
}
