import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import {
  otherVehicleMake,
  vehicleMakes,
  vehicleMakeOptions,
} from '../content/vehicleMakes.ts'
import { sellingFormSchema } from '../lib/schemas.ts'

/**
 * Tests als `.mjs` mit dem eingebauten Test-Runner von Node. Das Projekt hat
 * kein Test-Framework, und für die Prüfung eines Zod-Schemas eines dazu
 * aufzunehmen wäre unverhältnismäßig — Node führt die TypeScript-Module hier
 * per Type-Stripping direkt aus.
 */

/** Gültige Verkaufsanfrage ohne das Markenfeld. */
function baseSellingInput() {
  return {
    intent: 'sell',
    model: 'Golf VII',
    firstRegistration: '01.03.2018',
    mileage: '128000',
    name: 'Erika Mustermann',
    email: 'erika@example.com',
    consent: 'on',
  }
}

/** Erste Fehlermeldung zu einem Feld, oder undefined. */
function issueFor(result, path) {
  return result.error?.issues.find((issue) => issue.path[0] === path)?.message
}

describe('Markenliste', () => {
  it('ist alphabetisch nach deutscher Kollation sortiert', () => {
    const sorted = [...vehicleMakes].sort((a, b) => a.localeCompare(b, 'de'))
    assert.deepEqual([...vehicleMakes], sorted)
  })

  it('enthält die vom Kunden geforderten Marken', () => {
    for (const make of [
      'Audi',
      'BMW',
      'Citroën',
      'Cupra',
      'Dacia',
      'Fiat',
      'Ford',
      'Honda',
      'Hyundai',
      'Kia',
      'Land Rover',
      'Mazda',
      'Mercedes-Benz',
      'Mini',
      'Nissan',
      'Opel',
      'Peugeot',
      'Porsche',
      'Renault',
      'Seat',
      'Škoda',
      'Tesla',
      'Toyota',
      'Volkswagen',
      'Volvo',
    ]) {
      assert.ok(vehicleMakes.includes(make), `${make} fehlt in der Liste`)
    }
  })

  it('führt "Sonstige Marke" als letzte Auswahl und nicht als Marke', () => {
    assert.equal(vehicleMakeOptions.at(-1), otherVehicleMake)
    assert.ok(!vehicleMakes.includes(otherVehicleMake))
    assert.equal(vehicleMakeOptions.length, vehicleMakes.length + 1)
  })

  it('enthält keine Marke doppelt', () => {
    assert.equal(new Set(vehicleMakeOptions).size, vehicleMakeOptions.length)
  })
})

describe('Validierung des Markenfelds', () => {
  it('nimmt jede Marke aus dem Dropdown an', () => {
    for (const make of vehicleMakes) {
      const result = sellingFormSchema.safeParse({ ...baseSellingInput(), make })
      assert.ok(result.success, `${make} wurde abgelehnt`)
      assert.equal(result.data.make, make)
    }
  })

  it('bleibt ein Pflichtfeld', () => {
    const result = sellingFormSchema.safeParse({ ...baseSellingInput(), make: '' })
    assert.ok(!result.success)
    assert.equal(issueFor(result, 'make'), 'Bitte wählen Sie eine Marke aus')
  })

  it('lehnt eine Marke ab, die nicht im Dropdown steht', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: 'Trabant',
    })
    assert.ok(!result.success)
    assert.equal(issueFor(result, 'make'), 'Bitte wählen Sie eine Marke aus')
  })

  it('verlangt bei "Sonstige Marke" die freie Eingabe', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: otherVehicleMake,
    })
    assert.ok(!result.success)
    assert.equal(issueFor(result, 'makeOther'), 'Bitte geben Sie die Marke an')
  })

  it('lässt eine leere freie Eingabe nicht als Ausrede durchgehen', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: otherVehicleMake,
      makeOther: '   ',
    })
    assert.ok(!result.success)
    assert.equal(issueFor(result, 'makeOther'), 'Bitte geben Sie die Marke an')
  })

  it('ersetzt "Sonstige Marke" durch die freie Eingabe', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: otherVehicleMake,
      makeOther: '  Alfa Romeo  ',
    })
    assert.ok(result.success)
    assert.equal(result.data.make, 'Alfa Romeo')
    // Der Auswahlwert selbst darf nirgends weiterwandern.
    assert.ok(!('makeOther' in result.data))
  })

  it('ignoriert eine freie Eingabe, wenn eine echte Marke gewählt wurde', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: 'Audi',
      makeOther: 'Alfa Romeo',
    })
    assert.ok(result.success)
    assert.equal(result.data.make, 'Audi')
  })

  it('begrenzt die Länge der freien Eingabe', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: otherVehicleMake,
      makeOther: 'A'.repeat(61),
    })
    assert.ok(!result.success)
    assert.equal(
      issueFor(result, 'makeOther'),
      'Bitte die Marke etwas kürzer angeben'
    )
  })
})

describe('Übrige Formularprüfungen bleiben unberührt', () => {
  it('verlangt weiterhin die Einwilligung', () => {
    const input = baseSellingInput()
    delete input.consent

    const result = sellingFormSchema.safeParse({ ...input, make: 'Audi' })
    assert.ok(!result.success)
    assert.equal(
      issueFor(result, 'consent'),
      'Bitte bestätigen Sie die Datenschutzhinweise'
    )
  })

  it('verlangt weiterhin eine gültige Erstzulassung', () => {
    const result = sellingFormSchema.safeParse({
      ...baseSellingInput(),
      make: 'Audi',
      firstRegistration: '2018',
    })
    assert.ok(!result.success)
    assert.equal(
      issueFor(result, 'firstRegistration'),
      'Erstzulassung bitte als TT.MM.JJJJ angeben'
    )
  })
})
