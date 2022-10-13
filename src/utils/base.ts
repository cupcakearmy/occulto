export const isBrowser = typeof window !== 'undefined'

export type PromiseOrValue<T> = T | Promise<T>
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | BigInt64Array
  | BigUint64Array

export function split<T>({ node, browser }: { node: () => T; browser: () => T }) {
  return isBrowser ? browser() : node()
}
