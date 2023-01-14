# occulto 🔒

> Occulto <kbd>/okˈkul.to/</kbd>
>
> _hidden, concealed. secret._

![version badge](https://badgen.net/npm/v/occulto)
![downloads badge](https://badgen.net/npm/dt/occulto)
![dependency count](https://badgen.net/bundlephobia/dependency-count/occulto)
![minzip size badge](https://badgen.net/bundlephobia/minzip/occulto)
![types badge](https://badgen.net/npm/types/occulto)

Isomorphic encryption library that works both in the browser and node with _no dependencies_ and written in Typescript.

[**📒 API Documentation 📒**](https://occulto.pages.dev)

## Quickstart 🚀

###### Requirements

- Node >= 16 required

###### Install

```
npm i occulto
```

## Examples

### [RSA](https://occulto.pages.dev/classes/RSA)

```typescript
import { RSA } from 'occulto'

const pair = await RSA.generateKeyPair(2 ** 11)
const bytes = Bytes.encode(message)

const encrypted = await RSA.encrypt(bytes, pair.public)
const decrypted = await RSA.decrypt(encrypted, pair.private)
```

### [AES](https://occulto.pages.dev/classes/AES)

[Available Modes](https://occulto.pages.dev/enums/Modes)

There is an _easy_ API, that will take care of everything for you.

```typescript
import { AES } from 'occulto'

const password = 'foobar'
const message = 'this is a secret'

const encrypted = await AES.encryptEasy(message, password)
const decrypted = await AES.decryptEasy(encrypted, password)
```

The low level API is also exposed for advanced usages.

```typescript
import { AES } from 'occulto'

const message = 'this is a secret'
const key = await AES.generateKey()
const data = Bytes.encode(message)

const ciphertext = await AES.encrypt(data, key)
const plaintext = await AES.decrypt(ciphertext, key)
```

### [Hash](https://occulto.pages.dev/classes/Hash)

[Available hashes](https://occulto.pages.dev/enums/Hashes)

```typescript
import { Hash, Hashes } from 'occulto'

const hashed = await Hash.hash('Some value', Hashes.SHA_512)
```
