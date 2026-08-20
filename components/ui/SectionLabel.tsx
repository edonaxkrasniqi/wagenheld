interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  /**
   * 'onLight' nutzt den dunkleren Gold-Ton (4,52:1 auf Weiß),
   * 'onDark' das helle Markengold. Default ist onLight, weil die meisten
   * Abschnitte auf hellem Grund liegen.
   */
  tone?: 'onLight' | 'onDark'
}

export function SectionLabel({
  children,
  className = '',
  tone = 'onLight',
}: SectionLabelProps) {
  const color = tone === 'onDark' ? 'text-gold' : 'text-gold-ink'
  const rule = tone === 'onDark' ? 'bg-gold/60' : 'bg-gold-ink/50'

  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${color}${
        className ? ` ${className}` : ''
      }`}
    >
      <span aria-hidden="true" className={`h-px w-7 ${rule}`} />
      {children}
    </p>
  )
}
