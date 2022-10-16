module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    plugins: ['karma-mocha', '@endyjasmi/karma-playwright-launcher'],

    basePath: '',
    files: [
      { pattern: 'node_modules/chai/chai.js', type: 'module' },
      { pattern: 'dist/esm/**/*.js', type: 'module' },
      { pattern: 'test/**/*.js', type: 'module' },
    ],

    browsers: ['Chromium', 'Firefox', 'WebKit'],

    preprocessors: {},
    reporters: ['progress'],
    singleRun: false,
    concurrency: Infinity,
  })
}
