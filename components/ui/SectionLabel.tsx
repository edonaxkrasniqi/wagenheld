interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-sm font-semibold uppercase tracking-[0.2em] text-gold block${className ? ` ${className}` : ''}`}
    >
      {children}
    </p>
  )
}
