import { split, type TypedArray } from '../utils/base.js'

export class Base64 {
  static encode(s: string): string {
    return split<string>({
      node() {
        return Buffer.from(s).toString('base64')
      },
      browser() {
        return btoa(s)
      },
    })
  }

  static decode(s: string): string {
    return split({
      node() {
        return Buffer.from(s, 'base64').toString('utf8')
      },
      browser() {
        return atob(s)
      },
    })
  }
}

export class Hex {
  static encode(buffer: TypedArray): string {
    let s = ''
    for (const i of new Uint8Array(buffer)) {
      s += i.toString(16).padStart(2, '0')
    }
    return s
  }

  static decode(s: string): TypedArray {
    const size = s.length / 2
    const buffer = new Uint8Array(size)
    for (let i = 0; i < size; i++) {
      const idx = i * 2
      const segment = s.slice(idx, idx + 2)
      buffer[i] = parseInt(segment, 16)
    }
    return buffer
  }
}

export class Bytes {
  static decode(data: TypedArray): string {
    return split({
      node() {
        return Buffer.from(data).toString('utf-8')
      },
      browser() {
        return new TextDecoder().decode(data)
      },
    })
  }

  static encode(data: string): TypedArray {
    return split({
      node() {
        return Buffer.from(data)
      },
      browser() {
        return new TextEncoder().encode(data)
      },
    })
  }
}
