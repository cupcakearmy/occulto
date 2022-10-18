import { Bytes, RSA } from '../dist/index.js'
import { Promises } from './utils.js'
import { Precomputed } from './values.js'

describe('RSA', () => {
  describe('Generate keys', function () {
    this.timeout(10_000)

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
      await Promises.reject(() => RSA.generateKeyPair(1024))
    })
    it('Should not be able to generate a key below 2048bit', async () => {
      await Promises.reject(() => RSA.generateKeyPair(-1))
    })
  })

  describe('Encryption', () => {
    for (const message of Object.values(Precomputed.Crypto.Messages)) {
      it(`Should be able to encrypt and decrypt "${message.slice(0, 8)}..."`, async () => {
        const pair = await RSA.generateKeyPair(2 ** 11)
        const bytes = Bytes.encode(message)
        try {
          const encrypted = await RSA.encrypt(bytes, pair.public)
          chai.expect.fail('Should have thrown error')
          const decrypted = await RSA.decrypt(encrypted, pair.private)
          chai.expect(decrypted).to.be.deep.equal(bytes)
          chai.expect(message).to.be.equal(Bytes.decode(decrypted))
        } catch {}
      })
    }
  })
})
