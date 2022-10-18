import { isBrowser } from '../utils/base.js'

let crypto: typeof window.crypto | null = null

export async function getCrypto(): Promise<typeof window.crypto> {
  if (!crypto) {
    if (isBrowser) crypto = window.crypto
    else if (typeof require !== 'undefined') {
      const { webcrypto } = await require('crypto')
      crypto = webcrypto
    } else {
      // @ts-ignore
      const { webcrypto } = await import('crypto')
      crypto = webcrypto as any
    }
  }

  if (!crypto) throw new Error('No crypto available')
  return crypto
}
