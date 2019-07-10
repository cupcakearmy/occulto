# occulto 🔒

High level wrapper around the [node native crypto API](https://nodejs.org/api/crypto.html).

**No Deps & Typescript typings included**

Supports Hashes, Symmetric AES & ChaCha20 ciphers and Asymmetric RSA.

[**📒 DOCS HERE 📒**](https://cupcakearmy.github.io/occulto/index.html)

## Quickstart 🚀

###### Requirements

- Node >= 11 required (ChaCha20)

###### Install

```
npm i occulto
```

### Examples 

## [RSA](https://cupcakearmy.github.io/occulto/modules/_rsa_.html)

```typescript
import { RSA } from 'occulto'

const pair = await RSA.gen()
const encrypted = RSA.encrypt('some text', pair.pub)
const decrypted = RSA.decrypt(encrypted, pair.prv)
```

## [Symmetric](https://cupcakearmy.github.io/occulto/modules/_symmetric_.html)

[Available Ciphers](https://cupcakearmy.github.io/occulto/enums/_symmetric_.ciphers.html)

```javascript
import { Symmetric } from 'occulto'

const encrypted = Symmetric.encrypt('some string' , 'myPass', Symmetric.Ciphers.AES_128_GCM)
const decrypted = Symmetric.decrypt(encrypted, 'myPadd')
```

## [Hash](https://cupcakearmy.github.io/occulto/modules/_hash_.html)

[Available hashes](https://cupcakearmy.github.io/occulto/enums/_hash_.hashes.html)

```typescript
import { Hash } from 'occulto'

const hash = Hash.digest('something')

const h = Hash.digest('something', Hash.Hashes.MD5)

```
