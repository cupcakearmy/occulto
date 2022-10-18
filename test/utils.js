export class Promises {
  static async reject(fn) {
    try {
      await fn()
      chai.expect.fail('Should have thrown error')
    } catch {}
  }
}
