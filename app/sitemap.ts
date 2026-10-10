import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Impressum und Datenschutz stehen auf `noindex` und gehören deshalb
    // nicht in die Sitemap — beides zusammen sind widersprüchliche Signale.
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
  ]
}
