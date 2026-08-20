interface StarRatingProps {
  rating: number
  max?: number
  className?: string
}

export function StarRating({ rating, max = 5, className = '' }: StarRatingProps) {
  return (
    <div
      className={`flex text-gold${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`${rating} von ${max} Sternen`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <span
            key={i}
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: filled
                ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                : half
                  ? "'FILL' 0.5, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                  : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
            aria-hidden="true"
          >
            {half ? 'star_half' : 'star'}
          </span>
        )
      })}
    </div>
  )
}
