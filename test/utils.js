export class Promises {
  static async reject(fn) {
    try {
      await fn()
      chai.expect.fail('Should have thrown error')
    } catch {}
  }
}

export function compareArrayLike(a, b) {
  chai.expect(a.length).to.equal(b.length)
  for (let i = 0; i < a.length; i++) {
    chai.expect(a[i]).to.equal(b[i])
  }
}
