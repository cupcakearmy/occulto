import { isBrowser } from "../utils/base.js";

let crypto: Crypto | null = null;

export async function getCrypto(): Promise<Crypto> {
  if (!crypto) {
    if (isBrowser) {
      crypto = window.crypto;
    }
    if (typeof globalThis !== "undefined") {
      crypto = globalThis.crypto;
    }
  }

  if (!crypto) throw new Error("No crypto available");
  return crypto;
}
