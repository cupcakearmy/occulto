import type { TypedArray } from '../utils/base.js'
import { getCrypto } from './crypto.js'
import { Base64 } from './encoding.js'

const Constants = Object.freeze({
  name: 'RSA-OAEP',
  hash: 'SHA-512',
  exponent: new Uint8Array([1, 0, 1]),
  error: {
    invalidKey: new Error('invalid key'),
    shouldBePublicKey: new Error('should be a public key'),
    shouldBePrivateKey: new Error('should be a private key'),
    dataTooLong: new Error('data too long'),
  },
})

class Key {
  /**
   * Exports a key to a PEM string.
   */
  static async encode(key: CryptoKey): Promise<string> {
    const c = await getCrypto()

    let type: 'pkcs8' | 'spki'
    let label: string
    switch (key.type) {
      case 'private':
        type = 'pkcs8'
        label = 'PRIVATE'
        break
      case 'public':
        type = 'spki'
        label = 'PUBLIC'
        break

      default:
        throw new Error('invalid key type')
    }
    const exported = await c.subtle.exportKey(type, key)

    // Export in PEM format
    const base64 = await Base64.encode(new Uint8Array(exported))
    const formatted = base64.match(/.{1,64}/g)?.join('\n')
    return `-----BEGIN ${label} KEY-----\n${formatted}\n-----END ${label} KEY-----`
  }

  static async decode(s: string): Promise<CryptoKey> {
    const isPrivate = s.includes('BEGIN PRIVATE KEY')
    const cleaned = s.replace(/-----.*?-----/g, '').replace(/\s/g, '')
    const bytes = await Base64.decode(cleaned)
    const c = await getCrypto()
    return await c.subtle.importKey(
      isPrivate ? 'pkcs8' : 'spki',
      bytes,
      {
        name: Constants.name,
        hash: Constants.hash,
      },
      true,
      isPrivate ? ['decrypt'] : ['encrypt']
    )
  }

  /**
   * Get max size of payload to be encrypted.
   * The size depends on the key size and the hash function used.
   * https://www.rfc-editor.org/rfc/rfc2437#section-7.1.1
   */
  static getMaxMessageSize(key: CryptoKey): number {
    if (key.type !== 'public') throw Constants.error.shouldBePublicKey
    // @ts-ignore
    const mod = key?.algorithm?.modulusLength
    if (isNaN(mod)) throw Constants.error.invalidKey
    return mod / 8 - (2 * 512) / 8 - 2
  }
}

export class RSA {
  static async generateKeyPair(bits: number = 2 ** 12): Promise<{ private: string; public: string }> {
    const c = await getCrypto()

    if (bits < 2 ** 11) {
      throw new Error('bit sizes below 2048 are considered insecure.')
    }

    const pair = await c.subtle.generateKey(
      {
        name: Constants.name,
        modulusLength: bits,
        publicExponent: Constants.exponent,
        hash: Constants.hash,
      },
      true,
      ['encrypt', 'decrypt']
    )

    return {
      private: await Key.encode(pair.privateKey),
      public: await Key.encode(pair.publicKey),
    }
  }

  static async encrypt(data: TypedArray, key: string): Promise<TypedArray> {
    let keyObj: CryptoKey
    try {
      keyObj = await Key.decode(key)
    } catch (e) {
      throw Constants.error.invalidKey
    }
    if (keyObj.type !== 'public') {
      throw Constants.error.shouldBePublicKey
    }

    // Check if data is too large
    if (data.length > Key.getMaxMessageSize(keyObj)) throw Constants.error.dataTooLong

    const c = await getCrypto()
    const encrypted = await c.subtle.encrypt({ name: Constants.name }, keyObj, data)
    return new Uint8Array(encrypted)
  }

  static async decrypt(data: TypedArray, key: string): Promise<TypedArray> {
    let keyObj: CryptoKey
    try {
      keyObj = await Key.decode(key)
    } catch (e) {
      throw Constants.error.invalidKey
    }
    if (keyObj.type !== 'private') {
      throw Constants.error.shouldBePrivateKey
    }

    const c = await getCrypto()
    const decrypted = await c.subtle.decrypt({ name: Constants.name }, keyObj, data)
    return new Uint8Array(decrypted)
  }
}
