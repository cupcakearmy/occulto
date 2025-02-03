import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'node',
      environment: 'node',
    },
  },
  {
    test: {
      name: 'browser',
      browser: {
        provider: 'playwright',
        enabled: true,
        headless: true,
        instances: [{ browser: 'firefox' }, { browser: 'webkit' }, { browser: 'chromium' }],
      },
    },
  },
])
