module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    plugins: ['karma-mocha', 'karma-chrome-launcher', 'karma-firefox-launcher'],

    basePath: '',
    files: [
      { pattern: 'node_modules/chai/chai.js', type: 'module' },
      { pattern: 'dist/esm/**/*.js', type: 'module' },
      { pattern: 'test/**/*.js', type: 'module' },
    ],

    browsers: ['ChromeHeadless', 'FirefoxHeadless'],

    preprocessors: {},
    reporters: ['progress'],
    singleRun: true,
    concurrency: Infinity,
  })
}
