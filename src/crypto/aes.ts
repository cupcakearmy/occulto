import { type TypedArray } from '../utils/base.js'
import { getCrypto } from './crypto.js'
import { Base64, Bytes } from './encoding.js'
import { Hashes } from './hash.js'
import { getRandomBytes } from './random.js'

const Params = {
  GCM: {
    ivLength: 12,
    tagLength: 128,
  },
}

export type KeyData = {
  name: 'PBKDF2'
  hash: Hashes
  iterations: number
  salt: TypedArray
  length: number
}

/**
 * AES operation modes.
 */
export enum Modes {
  AES_GCM = 'AES-GCM',
}

export class AES {
  static Modes = Modes

  private static delimiter = '--' // delimiter with a character that is not allowed in base64 or hex
  private static delimiterEasy = '---'

  private static InvalidCiphertext = new Error('Invalid ciphertext')

  private static async join(...args: TypedArray[]): Promise<string> {
    const strings = await Promise.all(args.map(Base64.encode))
    return strings.join(AES.delimiter)
  }

  private static async split(ciphertext: string): Promise<TypedArray[]> {
    const splitted = ciphertext.split(AES.delimiter)
    return Promise.all(splitted.map(Base64.decode))
  }

  /**
   * Derive a key from a password.
   * To be used if the password is not 128, 192 or 256 bits or human made, non generated keys.
   */
  static async derive(key: string, options?: KeyData): Promise<[TypedArray, KeyData]> {
    options ??= {
      name: 'PBKDF2',
      hash: Hashes.SHA_512,
      iterations: 100_000,
      length: 256,
      salt: await getRandomBytes(16),
    }
    const c = await getCrypto()
    const keyBuffer = await c.subtle.importKey('raw', Bytes.encode(key), options.name, false, [
      'deriveBits',
      'deriveKey',
    ])
    const bits = await c.subtle.deriveBits(options, keyBuffer, options.length)
    return [new Uint8Array(bits), options]
  }

  static async encrypt(data: TypedArray, key: TypedArray, mode: Modes = Modes.AES_GCM): Promise<string> {
    const c = await getCrypto()

    let iv: Uint8Array
    let alg: AlgorithmIdentifier

    switch (mode) {
      case Modes.AES_GCM:
        iv = c.getRandomValues(new Uint8Array(Params.GCM.ivLength))
        alg = mode
        break
      default:
        throw new Error('Unsupported mode')
    }

    const keyObj = await c.subtle.importKey('raw', key, alg, false, ['encrypt'])
    const encrypted = await c.subtle.encrypt({ name: alg, iv }, keyObj, data)
    const encryptedBuffer = new Uint8Array(encrypted)

    return AES.join(Bytes.encode(alg), iv, encryptedBuffer)
  }

  static async decrypt(ciphertext: string, key: TypedArray): Promise<TypedArray> {
    const c = await getCrypto()

    const [alg, iv, data] = await AES.split(ciphertext)
    if (!alg || !iv || !data) throw this.InvalidCiphertext

    const mode = Bytes.decode(alg)
    switch (mode) {
      case Modes.AES_GCM:
        break
      default:
        throw new Error('Unsupported mode')
    }

    const keyObj = await c.subtle.importKey('raw', key, mode, false, ['decrypt'])
    const decrypted = await c.subtle.decrypt({ name: mode, iv }, keyObj, data)
    return new Uint8Array(decrypted)
  }

  static async encryptEasy(data: string | TypedArray, key: string, mode: Modes = Modes.AES_GCM): Promise<string> {
    const dataBuffer = typeof data === 'string' ? Bytes.encode(data) : data
    const [keyDerived, options] = await AES.derive(key)

    const ciphertext = await this.encrypt(dataBuffer, keyDerived, mode)
    const header = await this.join(
      Bytes.encode(options.name),
      Bytes.encode(options.hash),
      Bytes.encode(options.iterations.toString()),
      options.salt,
      Bytes.encode(options.length.toString())
    )

    return [header, ciphertext].join(this.delimiterEasy)
  }

  static async decryptEasy(ciphertext: string, key: string): Promise<string> {
    const [header, data] = ciphertext.split(this.delimiterEasy)
    if (!header || !data) throw this.InvalidCiphertext
    const [name, hash, iterations, salt, length] = await this.split(header)
    if (!name || !hash || !iterations || !salt || !length) throw this.InvalidCiphertext

    const options: KeyData = {
      name: Bytes.decode(name) as any,
      hash: Bytes.decode(hash) as any,
      iterations: parseInt(Bytes.decode(iterations)),
      salt,
      length: parseInt(Bytes.decode(length)),
    }
    if (isNaN(options.iterations) || isNaN(options.length)) throw this.InvalidCiphertext

    const [keyDerived] = await AES.derive(key, options)
    const decrypted = await this.decrypt(data, keyDerived)
    return Bytes.decode(decrypted)
  }
}
