#!/usr/bin/env zx

import 'zx/globals'

$.verbose = true

const BROWSERS = ['firefox', 'chromium', 'webkit']
await Promise.all([
  BROWSERS.map((browser) => $`pnpm vitest --browser.provider=playwright --browser.name=${browser} --browser.headless`),
])
