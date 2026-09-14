import { defineCloudflareConfig } from '@opennextjs/cloudflare'

/**
 * Standardkonfiguration ohne eigenen Cache-Backend.
 *
 * Die Seite ist statisch vorgerendert; dynamisch ist allein die Server Action
 * des Anfrageformulars, und die cacht nichts. Ein R2-Bucket als Incremental
 * Cache wäre hier Kosten und Betriebsaufwand ohne Gegenwert.
 *
 * Sobald eine Route `revalidate`, `revalidateTag` oder `use cache` verwendet,
 * gehört hier `r2IncrementalCache` hinein — zusammen mit dem R2-Bucket und der
 * WORKER_SELF_REFERENCE-Bindung in `wrangler.jsonc`.
 */
export default defineCloudflareConfig()
