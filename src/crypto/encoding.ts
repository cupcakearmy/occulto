import { split, type TypedArray } from '../utils/base.js'

export class Base64 {
  private static prefix = 'data:application/octet-stream;base64,'

  static encode(s: TypedArray): Promise<string> {
    return split({
      async node() {
        return Buffer.from(s).toString('base64')
      },
      async browser() {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = function (event) {
            const data = event.target?.result
            if (typeof data === 'string') resolve(data.slice(Base64.prefix.length))
            else reject(new Error('Failed to read file'))
          }
          reader.readAsDataURL(new Blob([s]))
        })
      },
    })
  }

  static decode(s: string): Promise<TypedArray> {
    return split({
      async node() {
        return Buffer.from(s, 'base64')
      },
      async browser() {
        const ab = await fetch(Base64.prefix + s)
          .then((r) => r.blob())
          .then((b) => b.arrayBuffer())
        return new Uint8Array(ab)
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
