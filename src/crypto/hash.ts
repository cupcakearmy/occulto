import { type TypedArray } from '../utils/base.js'
import { getCrypto } from './crypto.js'
import { Bytes, Hex } from './encoding.js'

/**
 * List of available hash functions.
 *
 * @remarks
 * For cryptographic details refer to: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#supported_algorithms
 * Reference: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
 */
export enum Hashes {
  /**
   * @remarks SHA-1 is not recommended for new applications as it's not cryptographically secure.
   */
  SHA_1 = 'SHA-1',
  SHA_256 = 'SHA-256',
  SHA_384 = 'SHA-384',
  SHA_512 = 'SHA-512',
}

export async function hash(data: string, hash: Hashes): Promise<string>
export async function hash(data: TypedArray, hash: Hashes): Promise<TypedArray>
export async function hash(data: string | TypedArray, hash: Hashes): Promise<string | TypedArray> {
  const isString = typeof data === 'string'
  const c = await getCrypto()
  const result = await c.subtle.digest(hash, isString ? Bytes.encode(data) : data)
  const buf = new Uint8Array(result)
  return isString ? Hex.encode(buf) : buf
}
