# occulto 🔒

High level wrapper around [forge](https://github.com/digitalbazaar/forge).

Supports Hashes, Symmetric AES & ChaCha20 ciphers and Asymmetric RSA.

**Typescript typings included**

## Quickstart 🚀

###### Install

```
npm i node-forge occulto
```

[**📒 DOCS HERE 📒**](https://cupcakearmy.github.io/occulto/index.html)

### Examples 

## RSA

```typescript
const pair = await RSA.gen()
const encrypted = RSA.encrypt('some text', pair.pub)
const decrypted = RSA.decrypt(encrypted, pair.prv)
```

## Symmetric

```javascript
import { Symmetric } from 'occulto'

const encrypted = Symmetric.encrypt('some string' , 'myPass', Symmetric.Ciphers.AES_128_GCM)
const decrypted = Symmetric.decrypt(encrypted, 'myPadd')
```

## Hash

```typescript
import { Hash } from 'occulto'

const hash = Hash.digest('something')

const h = Hash.digest('something', Hash.Hashes.MD5)

```
