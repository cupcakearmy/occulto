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

#### `RSA.gen(bits:? number)`

- bits: [optional, default=4096] Size of the RSA key

###### Examples

```javascript
const pair = await RSA.gen() // 4096-Bit
const smallPair = await RSA.gen(2**10) // 1024-Bit
```

#### `.add(amount, interval)`

Adds a specified amount to an existing duration

###### Example

```javascript
const a = new Duration(1, 'day')
a.add(12, 'hours')
a.asHour() // 36
```

#### `.subtract(amount, interval)`

Subtracts a specified amount to an existing duration

###### Example

```javascript
const a = new Duration(1, 'day')
a.subtract(12, 'hours')
a.asHour() // 12
```

#### Getters

Gets the amount of time interval, not the total time

- `.milliseconds()`
- `.seconds()`
- `.minutes()`
- `.hours()`
- `.days()`
- `.weeks()`
- `.years()`

###### Example

```javascript
const a = new Duration(1, 'day')
a.days() // 1
a.add(5, 'minutes')
a.days() // 1
a.add(1, 'year')
a.days() // 1
a.add(24, 'hours')
a.days() // 2
```

#### As interval

Calculates the time duration as a time interval.

- `.asMilliseconds()`
- `.asSeconds()`
- `.asMinutes()`
- `.asHours()`
- `.asDays()`
- `.asWeeks()`
- `.asYears()`

###### Example

```javascript
const a = new Duration(1, 'day')
a.asHours() // 24
```

#### `.humanize()`

This functions takes a duration and tries to make a human readable version out of it.

###### Example

```javascript
const a = new Duration(4, 'seconds')
a.humanize() // 'a moment'
a.add(5, 'minutes')
a.humanize() // 'a few minutes'
```

##### Own rules / i18n

If you want to pass a different humanize function you can.
The order of the array is important. The first match will return, like in a standard server router. The first argument is a function that takes the duration and returns a boolean. The second takes also matched duration and returns a string for the user.

###### Example

```javascript
const humanizer = [
	[d => d.days() > 1, d => `${d.days()} days`],
	[d => d.days() > 0, d => `1 day`],
	[() => true, () => 'catch all, below 1 day'],
]

const a = new Duration(2, 'days')
a.humanize(humanizer) // '2 days'
a.subtract(1, 'day')
a.humanize(humanizer) // '1 day'
a.subtract(12, 'hours')
a.humanize(humanizer) // 'catch all, below 1 day'
```
