/**
 * Hook for mocha tests in node
 * Initialises chai and chai-as-promised as global variables
 */

export const mochaHooks = {
  async beforeEach() {
    if (typeof chai === 'undefined') {
      global.chai = await import('chai')
    }
  },
}
