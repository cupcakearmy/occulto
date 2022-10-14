import { getCrypto } from './crypto.js'
import { Bytes, Hex } from './encoding.js'

export enum Hashes {
  SHA_1 = 'SHA-1',
  SHA_256 = 'SHA-256',
  SHA_384 = 'SHA-384',
  SHA_512 = 'SHA-512',
}

export async function hash(data: string, hash: Hashes): Promise<string>
export async function hash(data: Uint8Array, hash: Hashes): Promise<Uint8Array>
export async function hash(data: string | Uint8Array, hash: Hashes): Promise<string | Uint8Array> {
  const isString = typeof data === 'string'
  const c = await getCrypto()
  const result = await c.subtle.digest(hash, isString ? Bytes.encode(data) : data)
  const buf = new Uint8Array(result)
  return isString ? Hex.encode(buf) : buf
}
