import { describe, expect, it } from 'vitest'
import { AES, Bytes, Hashes, Hex } from '../dist/index.js'
import { Precomputed } from './values.js'

describe('AES', () => {
  for (const message of Object.values(Precomputed.Crypto.Messages)) {
    describe(`Message: ${message.slice(0, 8)}...`, () => {
      describe('Basic API', () => {
        for (const keySize of [128, 256]) {
          it('Key Size: ' + keySize, async () => {
            const data = Bytes.encode(message)
            const [key] = await AES.derive('foo', {
              name: 'PBKDF2',
              hash: Hashes.SHA_512,
              iterations: 1000,
              length: keySize,
              salt: Hex.decode(Precomputed.Crypto.Bytes[16]),
            })
            const ciphertext = await AES.encrypt(data, key, AES.Modes.AES_GCM)
            const plaintext = await AES.decrypt(ciphertext, key)
            expect(data.buffer).toEqual(plaintext.buffer)
            expect(message).toEqual(Bytes.decode(plaintext))
          })
        }
      })

      it('Generated Key', async () => {
        const key = await AES.generateKey()
        const data = Bytes.encode(message)
        const ciphertext = await AES.encrypt(data, key)
        const plaintext = await AES.decrypt(ciphertext, key)
        expect(data.buffer).toEqual(plaintext.buffer)
        expect(message).toEqual(Bytes.decode(plaintext))
      })

      it('Easy API', async () => {
        const password = 'foobar'
        const encrypted = await AES.encryptEasy(message, password)
        const decrypted = await AES.decryptEasy(encrypted, password)
        expect(message).toEqual(decrypted)
      })
    })
  }
})
