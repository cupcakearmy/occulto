# occulto 🔒

High level wrapper around [forge](https://github.com/digitalbazaar/forge).

Supports Hashes, Symmetric AES & ChaCha20 ciphers and Asymmetric RSA.

**Typescript typings included**

## Quickstart 🚀

###### Install

```
npm i node-forge occulto
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

## Symmetric

### `Symmetric.Ciphers`

Available ciphers

- `Ciphers.ChaCha20`
- `Ciphers.AES_256_GCM`
- `Ciphers.AES_192_GCM`
- `Ciphers.AES_128_GCM`
- `Ciphers.AES_256_CTR`
- `Ciphers.AES_192_CTR`
- `Ciphers.AES_128_CTR`

#### `Symmetric.encrypt(data: string, key: string, type: Ciphers = Ciphers.AES_256_GCM)`

Encrypts a string.
Defaults to `Ciphers.AES_256_CTR`

###### Examples

```javascript
const encrypted = Symmetric.encrypt('some string' , 'myPass')

const e = Symmetric.encrypt('some string' , 'myPass', Ciphers.AES_128_GCM)
```

## Hash

### `Hash.Hashes`

Available hashes

- `Hashes.MD5`
- `Hashes.SHA1_1`
- `Hashes.SHA1_256`
- `Hashes.SHA1_512`
- `Hashes.SHA3_256`
- `Hashes.SHA3_384`
- `Hashes.SHA3_512`

#### `Hash.digest(s: string, type: Hashes = Hashes.SHA3_256)`

Calculates the hash of a string.
Defaults to `Hashes.SHA3_256`

###### Examples

```javascript
const hash = Hash.digest('something')

const h = Hash.digest('something', Hashes.MD5)

```
