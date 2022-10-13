export { Base64, Bytes } from './crypto/encoding.js'
export { hash, Hashes } from './crypto/hash.js'
export { getRandomBytes } from './crypto/random.js'

import { isBrowser } from './utils/base.js'

export function sum(a: number, b: number): number {
  console.log(`Executing from: ${isBrowser ? 'browser' : 'server'}`)
  return a + b
}
