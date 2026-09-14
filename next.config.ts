import type { NextConfig } from 'next'

/**
 * Sicherheitsheader.
 *
 * HSTS steht bewusst NICHT hier: das setzt Cloudflare auf Zonenebene
 * (SSL/TLS → Edge Certificates → HTTP Strict Transport Security). Zwei Stellen
 * für denselben Header laufen erfahrungsgemäß auseinander.
 *
 * Die CSP läuft absichtlich als `Report-Only`. Next.js setzt Inline-Styles und
 * einen Inline-Bootstrap-Skriptblock; eine scharfe Policy ohne Nonce würde die
 * Seite zerlegen. Report-Only zeigt in der Browser-Konsole, was eine scharfe
 * Policy blockieren *würde*. Erst wenn dort über mehrere Tage nichts
 * Unerwartetes mehr auftaucht, darf daraus `Content-Security-Policy` werden —
 * und dann bitte zuerst auf einer Preview-URL, nicht auf der Kundendomain.
 *
 * `frame-ancestors 'none'` ist der Ersatz für X-Frame-Options und wirkt auch
 * im Report-Only-Modus nicht — deshalb steht X-Frame-Options zusätzlich als
 * scharfer Header darunter.
 */
const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  // Next.js liefert seinen Bootstrap als Inline-Skript aus.
  "script-src 'self' 'unsafe-inline'",
  // Tailwind erzeugt Klassen, Next.js setzt daneben Inline-Styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com",
  "font-src 'self'",
  // Server Actions posten auf dieselbe Herkunft; sonst spricht die Seite mit
  // niemandem. Wer hier etwas ergänzt, ergänzt es auch in der
  // Datenschutzerklärung.
  "connect-src 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: contentSecurityPolicyReportOnly,
  },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida-public/**',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
