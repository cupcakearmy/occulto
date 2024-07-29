import { describe, expect, it } from 'vitest'
import { getRandomBytes } from '../dist/index.js'

describe('Random', () => {
  it('Should be able to create random values', async () => {
    const buffer = await getRandomBytes(8)
    expect(buffer).instanceOf(Uint8Array)
    expect(buffer.byteLength).toEqual(8)
  })

  it('Should throw error on empty array', async () => {
    await expect(() => getRandomBytes(0)).rejects.toThrowErrorMatchingSnapshot()
  })

  it('Should throw error on negative bytes', async () => {
    await expect(() => getRandomBytes(-1)).rejects.toThrowErrorMatchingSnapshot()
  })
})
