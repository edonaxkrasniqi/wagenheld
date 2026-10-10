import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { submitSellingForm } from '../lib/actions.ts'

/**
 * Fehlerrückmeldung des Formulars: je Feld eine Meldung, und die Eingaben
 * kommen zurück, damit nach einem Tippfehler nichts neu getippt werden muss.
 * Ungültige Anfragen erreichen den Versand nie — die Tests brauchen deshalb
 * keinen RESEND_API_KEY.
 */
function formData(entries) {
  const data = new FormData()
  for (const [key, value] of Object.entries(entries)) data.append(key, value)
  return data
}

const validSell = {
  intent: 'sell',
  make: 'Volkswagen',
  model: 'Golf VII',
  firstRegistration: '01.03.2018',
  mileage: '128000',
  name: 'Erika Mustermann',
  email: 'erika@example.com',
  consent: 'on',
}

describe('submitSellingForm – Fehler je Feld', () => {
  it('meldet ein ungültiges Datum am Feld und gibt die Eingaben zurück', async () => {
    const state = await submitSellingForm(
      null,
      formData({ ...validSell, firstRegistration: '31.02.2018' })
    )
    assert.equal(state.success, false)
    assert.ok(state.fieldErrors.firstRegistration)
    assert.equal(Object.keys(state.fieldErrors).length, 1)
    assert.equal(state.values.model, 'Golf VII')
    assert.equal(state.values.firstRegistration, '31.02.2018')
  })

  it('meldet mehrere Felder gleichzeitig', async () => {
    const state = await submitSellingForm(
      null,
      formData({ ...validSell, email: 'keine-adresse', name: 'E' })
    )
    assert.ok(state.fieldErrors.email)
    assert.ok(state.fieldErrors.name)
  })

  it('meldet die fehlende Bestätigung der Datenschutzhinweise', async () => {
    const { consent, ...rest } = validSell
    void consent
    const state = await submitSellingForm(null, formData(rest))
    assert.ok(state.fieldErrors.consent)
  })

  it('prüft die Suchanfrage mit ihrem eigenen Schema', async () => {
    const state = await submitSellingForm(
      null,
      formData({ intent: 'buy', message: 'kurz', name: 'Erika', email: 'erika@example.com', consent: 'on' })
    )
    assert.ok(state.fieldErrors.message)
  })

  it('spiegelt keine fremden Felder zurück', async () => {
    const state = await submitSellingForm(
      null,
      formData({ ...validSell, email: 'x', evil: '<script>' })
    )
    assert.equal(state.values.evil, undefined)
  })

  it('meldet einen leeren Kilometerstand als fehlend, nicht als „nicht positiv"', async () => {
    const state = await submitSellingForm(null, formData({ ...validSell, mileage: '' }))
    assert.match(state.fieldErrors.mileage, /Kilometerstand an/)
  })

  it('lehnt Zeilenumbrüche in einzeiligen Feldern ab (Mail-Betreff)', async () => {
    const state = await submitSellingForm(
      null,
      formData({ ...validSell, name: 'Erika\r\nBcc: x@example.com' })
    )
    assert.ok(state.fieldErrors.name)
  })

  it('gibt die Anfrageart mit zurück', async () => {
    const state = await submitSellingForm(null, formData({ ...validSell, email: 'x' }))
    assert.equal(state.values.intent, 'sell')
  })
})
