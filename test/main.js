const { describe, it } = require('mocha')
const a = require('assert')


describe('Check imports', () => {
    it('default', () => {
        const Occulto = require('../').default

        a.notStrictEqual(undefined, Occulto.RSA)
        a.notStrictEqual(undefined, Occulto.Symmetric)
    })
    it('normal', () => {
        const { RSA, Symmetric } = require('../')

        a.notStrictEqual(undefined, RSA)
        a.notStrictEqual(undefined, Symmetric)
    })
})

const { RSA, Symmetric, Hash } = require('../')

describe('Asymmetric', () => {

    describe('RSA', () => {
        it('Encrypt and Decrypt small string', async () => {
            const pair = await RSA.gen(2 ** 10)
            const text = `some small string`
            const e = RSA.encrypt(text, pair.pub)
            const d = RSA.decrypt(e, pair.prv)
            a.strictEqual(text, d)
        })
    })

})

describe('Symmetric', () => {

    const keyLong = `yruyLaCAbcfJD9DKk3Ef6zuSFMPatwbg63ayPHVDSSxAePqtYxmd7N5BX2ShCgaG`
    const keyShort = `simple`
    const dataShort = `a sentence`
    const dataLong = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

    describe('Symmetric', () => {

        describe('Default', () => {
            it('Short', () => {
                const e = Symmetric.encrypt(dataShort, keyShort)
                const d = Symmetric.decrypt(e, keyShort)
                a.strictEqual(dataShort, d)
            })
            it('Long', () => {
                const e = Symmetric.encrypt(dataLong, keyLong)
                const d = Symmetric.decrypt(e, keyLong)
                a.strictEqual(dataLong, d)
            })
        })

        describe('All Ciphers', () => {
            for (const [key, value] of Object.entries(Symmetric.Ciphers)) {
                if (!isNaN(key)) continue
                it(key, () => {
                    const e = Symmetric.encrypt(dataShort, keyShort, value)
                    const d = Symmetric.decrypt(e, keyShort)
                    a.strictEqual(dataShort, d)
                })
            }
        })

    })
})

describe('Hashes', () => {

    const dataShort = `a sentence`
    const dataLong = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

        describe('All Hashes', () => {
            for (const [key, value] of Object.entries(Hash.Hashes)) {
                if (!isNaN(key)) continue
                it(key, () => {
                    const short = Hash.digest(dataShort, value)
                    a.notStrictEqual(undefined, short)

                    const long = Hash.digest(dataLong, value)
                    a.notStrictEqual(undefined, long)
                })
            }
        })
})