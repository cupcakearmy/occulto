# occulto 🔒

High leven wrapper around [forge](https://github.com/digitalbazaar/forge).

**Typescript typings included**

## Quickstart 🚀

###### Install

```
npm i occulto
```

```javascript
// Whatever import you prefer
// const { RSA } = require('occulto')
import { RSA } from 'occulto'

const pair = await RSA.gen()

const encrypted = RSA.encrypt('some string', 'myPass')
const decrypted = RSA.decrypt(encrypted, 'myPass')

```

### Reference 📒

## RSA

#### `RSA.gen(size: number = 2 ** 12)`

- size: [optional, default=4096] Size of the RSA key

###### Examples

```javascript
const pair = await RSA.gen() // 4096-Bit
const smallPair = await RSA.gen(2**10) // 1024-Bit
```

#### `RSA.encrypt(data: string, key: PublicKey)`

Encrypt message with public key

###### Example

```javascript
const pair = await RSA.gen()
const encrypted = RSA.encrypt('some text', pair.pub)
```

#### `RSA.decrypt(data: string, key: PrivateKey)`

Decrypts a message encrypted with `RSA.encrypt()` with the private key

###### Example

```javascript
const pair = await RSA.gen()
const encrypted = RSA.encrypt('some text', pair.pub)
const decrypted = RSA.decrypt(encrypted, pair.prv)
```

## AES

### `AES.Ciphers`

Available ciphers

- `Ciphers.AES_256_GCM`
- `Ciphers.AES_192_GCM`
- `Ciphers.AES_128_GCM`

#### `AES.encrypt(data: string, key: string, type: Ciphers = Ciphers.AES_256_GCM)`

Encrypts a string.
Defaults to `Ciphers.AES_256_GCM`

###### Examples

```javascript
const encrypted = AES.encrypt('some string' , 'myPass')

const e = AES.encrypt('some string' , 'myPass', Ciphers.AES_128_GCM)
```

#### `RSA.decrypt(e: string, key: string)`

Decrypt data encrypted by `AES.encrypt()`

###### Example

```javascript
const encrypted = AES.encrypt('some string' , 'myPass')
const decrypted = AES.decrypt(encrypted , 'myPass')
```
