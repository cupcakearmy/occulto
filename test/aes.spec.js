import { AES, Bytes, Hashes, Hex } from '../dist/index.js'
import { Precomputed } from './values.js'

describe('AES', () => {
  it('Basic API', async () => {
    const message = Precomputed.Crypto.Messages.nietzscheIpsum
    const data = Bytes.encode(message)
    const [key] = await AES.derive('foo', {
      name: 'PBKDF2',
      hash: Hashes.SHA_512,
      iterations: 1000,
      length: 256,
      salt: Hex.decode(Precomputed.Crypto.Bytes[16]),
    })
    const ciphertext = await AES.encrypt(data, key, AES.Modes.GCM)
    const plaintext = await AES.decrypt(ciphertext, key)
    chai.expect(data).to.be.deep.equal(plaintext)
    chai.expect(message).to.be.equal(Bytes.decode(plaintext))
  })

  it('Easy API', async () => {
    const message = Precomputed.Crypto.Messages.nietzscheIpsum
    const password = 'foobar'
    const encrypted = await AES.encryptEasy(message, password)
    const decrypted = await AES.decryptEasy(encrypted, password)
    chai.expect(message).to.be.equal(decrypted)
  })
})
