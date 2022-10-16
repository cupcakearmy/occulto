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

const pair = await RSA.generateKeyPair()
const encrypted = await RSA.encrypt('some text', pair.public)
const decrypted = await RSA.decrypt(encrypted, pair.private)
```

### [AES](https://occulto.pages.dev/classes/AES)

[Available Modes](https://occulto.pages.dev/enums/Modes)

```javascript
import { Symmetric } from 'occulto'

const encrypted = await Symmetric.encryptEasy('some string', 'myPass')
const decrypted = await Symmetric.decryptEasy(encrypted, 'myPass')
```

### [Hash](https://occulto.pages.dev/classes/Hash)

[Available hashes](https://occulto.pages.dev/enums/Hashes)

```typescript
import { Hash } from 'occulto'

const hash = Hash.digest('something')

const h = Hash.digest('something', Hash.Hashes.MD5)
```
