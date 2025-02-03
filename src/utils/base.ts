/**
 * @internal
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * @internal
 */
export type PromiseOrValue<T> = T | Promise<T>

/**
 * @internal
 */
export function split<T>({ node, browser }: { node: () => T; browser: () => T }) {
  return isBrowser ? browser() : node()
}
