import { getCrypto } from './crypto.js'
import { Bytes, Hex } from './encoding.js'

export enum Hashes {
  SHA_1 = 'SHA-1',
  SHA_256 = 'SHA-256',
  SHA_384 = 'SHA-384',
  SHA_512 = 'SHA-512',
}

export async function hash(data: string, hash: Hashes): Promise<string> {
  const c = await getCrypto()
  const result = await c.subtle.digest(hash, Bytes.encode(data))
  return Hex.encode(result)
}
