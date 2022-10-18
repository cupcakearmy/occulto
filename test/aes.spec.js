import { AES, Bytes, Hashes, Hex } from '../dist/index.js'
import { Precomputed } from './values.js'

describe('AES', () => {
  for (const keySize of [128, 192, 256]) {
    describe('Key Size: ' + keySize, () => {
      for (const message of Object.values(Precomputed.Crypto.Messages)) {
        describe(`Message: ${message.slice(0, 8)}...`, () => {
          it('Basic API', async () => {
            const data = Bytes.encode(message)
            const [key] = await AES.derive('foo', {
              name: 'PBKDF2',
              hash: Hashes.SHA_512,
              iterations: 1000,
              length: keySize,
              salt: Hex.decode(Precomputed.Crypto.Bytes[16]),
            })
            const ciphertext = await AES.encrypt(data, key, AES.Modes.GCM)
            const plaintext = await AES.decrypt(ciphertext, key)
            chai.expect(data).to.be.deep.equal(plaintext)
            chai.expect(message).to.be.equal(Bytes.decode(plaintext))
          })

          it('Easy API', async () => {
            const password = 'foobar'
            const encrypted = await AES.encryptEasy(message, password)
            const decrypted = await AES.decryptEasy(encrypted, password)
            chai.expect(message).to.be.equal(decrypted)
          })
        })
      }
    })
  }
})
