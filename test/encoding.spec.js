import { Base64 } from '../dist/esm/index.js'
import { Precomputed } from './values.js'

describe('Encoding', () => {
  describe('Base64', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Base64)) {
      it(`Should encode ${input} to ${output}`, () => {
        chai.expect(Base64.encode(input)).to.equal(output)
      })
      it(`Should decode ${output} to ${input}`, () => {
        chai.expect(Base64.decode(output)).to.equal(input)
      })
    }
  })
})
