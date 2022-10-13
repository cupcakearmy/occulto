import { getRandomBytes } from '../dist/esm/index.js'
import { Promises } from './utils.js'

describe('Random', () => {
  it('Should be able to create random values', async () => {
    const buffer = await getRandomBytes(8)
    chai.expect(buffer).to.be.instanceOf(Uint8Array)
    chai.expect(buffer.byteLength).to.equal(8)
  })

  it('Should throw error on empty array', async () => {
    await Promises.reject(() => getRandomBytes(0))
  })

  it('Should throw error on negative bytes', async () => {
    await Promises.reject(() => getRandomBytes(-1))
  })
})
