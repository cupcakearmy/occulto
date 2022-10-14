import { Bytes, hash, Hashes, Hex } from '../dist/esm/index.js'
import { Precomputed } from './values.js'

describe('Hash', () => {
  for (const type of Object.keys(Hashes)) {
    describe(type, () => {
      const values = Precomputed.Hash[type]
      for (const [input, output] of Object.entries(values)) {
        it(`Should hash "${input}" to "${output.slice(0, 8)}..."`, async () => {
          const hashed = await hash(input, Hashes[type])
          chai.expect(hashed).to.equal(output)
        })

        it(`Should hash "${input}" to "${output.slice(0, 8)}..." as buffer`, async () => {
          const outputBuffer = Hex.decode(output)
          const inputBuffer = Bytes.encode(input)
          const hashed = await hash(inputBuffer, Hashes[type])
          chai.expect(hashed).to.deep.equal(outputBuffer)
        })
      }
    })
  }
})
