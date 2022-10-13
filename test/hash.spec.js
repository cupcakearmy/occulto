import { hash, Hashes } from '../dist/esm/index.js'
import { Precomputed } from './values.js'

describe('Hash', () => {
  for (const type of Object.keys(Hashes)) {
    describe(type, () => {
      const values = Precomputed.Hash[type]
      for (const [input, output] of Object.entries(values)) {
        it(`Should hash ${input} to ${output}`, async () => {
          const hashed = await hash(input, Hashes[type])
          chai.expect(hashed).to.equal(output)
        })
      }
    })
  }
})
