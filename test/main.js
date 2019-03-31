const { describe, it } = require('mocha')
const a = require('assert')


describe('Check imports', () => {
    it('default', () => {
        const Occulto = require('../').default

        a.notStrictEqual(undefined, Occulto.RSA)
        a.notStrictEqual(undefined, Occulto.AES)
    })
    it('normal', () => {
        const {RSA, AES} = require('../')

        a.notStrictEqual(undefined, RSA)
        a.notStrictEqual(undefined, AES)
    })
})

const { RSA, AES } = require('../')

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

    describe('AES', () => {

        describe('Default', () => {
            it('Short', () => {
                const e = AES.encrypt(dataShort, keyShort)
                const d = AES.decrypt(e, keyShort)
                a.strictEqual(dataShort, d)
            })
            it('Long', () => {
                const e = AES.encrypt(dataLong, keyLong)
                const d = AES.decrypt(e, keyLong)
                a.strictEqual(dataLong, d)
            })
        })

        describe('GCM', () => {
            it('128', () => {
                const e = AES.encrypt(dataShort, keyShort, AES.Ciphers.AES_128_GCM)
                const d = AES.decrypt(e, keyShort)
                a.strictEqual(dataShort, d)
            })
            it('192', () => {
                const e = AES.encrypt(dataShort, keyShort, AES.Ciphers.AES_192_GCM)
                const d = AES.decrypt(e, keyShort)
                a.strictEqual(dataShort, d)
            })
            it('256', () => {
                const e = AES.encrypt(dataShort, keyShort, AES.Ciphers.AES_256_GCM)
                const d = AES.decrypt(e, keyShort)
                a.strictEqual(dataShort, d)
            })
        })

    })

})