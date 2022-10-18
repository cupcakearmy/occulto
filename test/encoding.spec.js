import { Base64, Bytes, Hex } from '../dist/index.js'
import { Precomputed } from './values.js'

describe('Encoding', () => {
  describe('Hex', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Hex)) {
      const buffer = Bytes.encode(input)
      it(`Should encode ${input} to ${output}`, async () => {
        chai.expect(await Hex.encode(buffer)).to.equal(output)
      })
      it(`Should decode ${output} to ${input}`, async () => {
        chai.expect(await Hex.decode(output)).to.deep.equal(buffer)
      })
    }
  })
  describe('Base64', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Base64)) {
      const buffer = Bytes.encode(input)
      it(`Should encode ${input} to ${output}`, async () => {
        chai.expect(await Base64.encode(buffer)).to.equal(output)
      })
      it(`Should decode ${output} to ${input}`, async () => {
        chai.expect(await Base64.decode(output)).to.deep.equal(buffer)
      })
    }
  })
})
