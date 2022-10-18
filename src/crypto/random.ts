import { type TypedArray } from '../utils/base.js'
import { getCrypto } from './crypto.js'

export async function getRandomBytes(bytes: number): Promise<TypedArray> {
  if (bytes <= 0) throw new Error('Invalid number of bytes')

  const buffer = new Uint8Array(bytes)
  const crypto = await getCrypto()
  crypto.getRandomValues(buffer)
  return buffer
}
