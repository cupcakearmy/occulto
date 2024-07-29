import { describe, expect, it } from 'vitest'
import { Base64, Bytes, Hex } from '../dist/index.js'
import { Precomputed } from './values.js'

describe('Encoding', () => {
  describe('Bytes', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Bytes)) {
      it(`Should encode ${input} to ${output}`, async () => {
        expect(Bytes.encode(input).buffer).toEqual(output.buffer)
      })
      it(`Should decode ${output} to ${input}`, async () => {
        expect(Bytes.decode(output)).toEqual(input)
      })
    }
  })
  describe('Hex', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Hex)) {
      const buffer = Bytes.encode(input)
      it(`Should encode ${input} to ${output}`, async () => {
        expect(Hex.encode(buffer)).toEqual(output)
      })
      it(`Should decode ${output} to ${input}`, async () => {
        expect(Hex.decode(output).buffer).toEqual(buffer.buffer)
      })
    }
  })
  describe('Base64', () => {
    for (const [input, output] of Object.entries(Precomputed.Encoding.Base64)) {
      const buffer = Bytes.encode(input)
      it(`Should encode ${input} to ${output}`, async () => {
        expect(await Base64.encode(buffer)).toEqual(output)
      })
      it(`Should decode ${output} to ${input}`, async () => {
        expect((await Base64.decode(output)).buffer).toEqual(buffer.buffer)
      })
    }
  })
})
