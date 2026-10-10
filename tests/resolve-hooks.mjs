import { existsSync } from 'node:fs'
import { registerHooks } from 'node:module'

/**
 * Auflösungs-Hooks nur für die Tests.
 *
 * Node kennt weder den `@/`-Alias aus der tsconfig noch die endungslosen
 * Importe, die TypeScript erlaubt. Beides bringt dieser Hook nach — damit die
 * Tests dieselben Module laden wie die Anwendung, statt daneben eine zweite
 * Wahrheit aufzubauen.
 *
 * Bewusst nur hier und nicht als Bundler- oder tsconfig-Änderung: Next.js löst
 * beides beim Bauen längst korrekt auf, die Lücke besteht ausschließlich beim
 * direkten Ausführen durch Node.
 */

const projectRoot = new URL('../', import.meta.url)

/** Ergänzt die Dateiendung, die TypeScript im Import weglassen darf. */
function withExtension(url) {
  if (existsSync(url)) return url

  for (const extension of ['.ts', '.tsx', '.mts']) {
    const candidate = new URL(url.href + extension)
    if (existsSync(candidate)) return candidate
  }

  return url
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    // Die ergänzte URL geht durch `nextResolve` zurück in die normale
    // Auflösung. Ein `shortCircuit` würde auch die Formaterkennung
    // überspringen — Node hielte die .ts-Datei dann für gewöhnliches
    // JavaScript und stolperte über die erste Typannotation.
    if (specifier.startsWith('@/')) {
      const url = withExtension(new URL(specifier.slice(2), projectRoot))
      return nextResolve(url.href, context)
    }

    // Nur projekteigene Dateien — Pakete unter node_modules lösen ihre
    // relativen Importe selbst auf (CommonJS ergänzt `.js` eigenständig).
    // Ein Umschreiben hier hätte z. B. `resend` → `standardwebhooks` zerlegt.
    if (
      specifier.startsWith('.') &&
      context.parentURL &&
      !context.parentURL.includes('/node_modules/')
    ) {
      const url = withExtension(new URL(specifier, context.parentURL))
      return nextResolve(url.href, context)
    }

    return nextResolve(specifier, context)
  },
})
