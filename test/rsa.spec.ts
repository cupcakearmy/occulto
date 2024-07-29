import { describe } from 'vitest'
import { Bytes, RSA } from '../dist/index.js'
import { Precomputed } from './values.js'
import { it } from 'vitest'
import { expect } from 'vitest'

describe('RSA', () => {
  describe('Generate keys', function () {
    it('Should be able to generate a keypair', async () => {
      await RSA.generateKeyPair()
    })
    it('Should be able to generate a keypair with 2048bit', async () => {
      await RSA.generateKeyPair(2048)
    })
    it('Should be able to generate a keypair with 4096bit', async () => {
      await RSA.generateKeyPair(4096)
    })
    it('Should not be able to generate a key below 2048bit', async () => {
      await expect(() => RSA.generateKeyPair(1024)).rejects.toThrowErrorMatchingSnapshot()
    })
    it('Should not be able to generate a key below 2048bit', async () => {
      await expect(() => RSA.generateKeyPair(-1)).rejects.toThrowErrorMatchingSnapshot()
    })
  })

  describe('Encryption', () => {
    for (const message of Object.values(Precomputed.Crypto.Messages)) {
      it(`Should be able to encrypt and decrypt "${message.slice(0, 8)}..."`, async () => {
        const pair = await RSA.generateKeyPair(2 ** 11)
        const bytes = Bytes.encode(message)
        try {
          const encrypted = await RSA.encrypt(bytes, pair.public)
          const decrypted = await RSA.decrypt(encrypted, pair.private)
          expect(decrypted).toEqual(bytes)
          expect(message).toEqual(Bytes.decode(decrypted))
        } catch {}
      })
    }
  })
})
