interface IconProps {
  name: string
  className?: string
  filled?: boolean
}

/**
 * Symbole, die im lokalen Material-Symbols-Subset fehlen.
 *
 * Die Symbol-Schrift unter `public/fonts/` ist ein Ausschnitt mit rund 50
 * Ligaturen. Ein Name, der darin nicht vorkommt, erscheint als Klartext auf der
 * Seite (genau das ist am 20.08. mit fünf Icons passiert). Wer ein neues Symbol
 * braucht, prüft zuerst das Subset und legt es sonst hier als SVG an.
 *
 * `chat` ist eine neutrale Sprechblase für den WhatsApp-Link — bewusst nicht
 * das WhatsApp-Logo, damit keine Markenvorgaben greifen.
 */
const inlineIcons: Record<string, React.ReactNode> = {
  chat: (
    <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8.4L4.7 20.2A.75.75 0 0 1 3.5 19.6V5A1 1 0 0 1 4 4Zm3.5 5.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm4.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
  ),
}

export function Icon({ name, className = '', filled = false }: IconProps) {
  const inline = inlineIcons[name]
  if (inline) {
    // 1em im Quadrat, damit das SVG dieselben Größenklassen (text-2xl usw.)
    // versteht wie die Symbol-Schrift daneben.
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={`inline-block h-[1em] w-[1em] shrink-0${className ? ` ${className}` : ''}`}
      >
        {inline}
      </svg>
    )
  }

  return (
    <span
      className={`material-symbols-outlined${filled ? ' icon-filled' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
