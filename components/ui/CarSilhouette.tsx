/**
 * Auto-Silhouette als grafisches Element — Kundenanforderung aus
 * Trello-Karte #29 ("silouezze von einem Auto").
 *
 * Rein dekorativ, deshalb aria-hidden und ohne Titel. Als Inline-SVG statt
 * als Bilddatei, damit es den LCP nicht belastet und in jeder Größe scharf
 * bleibt.
 */
export function CarSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 190"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 150V126c0-10 7-19 17-21l92-16 76-53c13-9 28-14 44-14h146c18 0 36 7 49 20l52 51 100 17c17 3 29 17 29 34v16H10Z"
        fill="currentColor"
      />
      <path
        d="M214 78l52-36c8-6 18-9 28-9h60v45H214Zm168 0V33h44c11 0 22 4 30 12l33 33H382Z"
        fill="#000"
        fillOpacity="0.55"
      />
      <circle cx="168" cy="150" r="40" fill="#000" fillOpacity="0.55" />
      <circle cx="482" cy="150" r="40" fill="#000" fillOpacity="0.55" />
      <circle cx="168" cy="150" r="17" fill="currentColor" />
      <circle cx="482" cy="150" r="17" fill="currentColor" />
    </svg>
  )
}
