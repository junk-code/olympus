// god of construction
console.log('Hephaestus awakens...')
const { spawn } = require('child_process')

const Bundler = require('parcel-bundler')
const Path = require('path')

// Single entrypoint file location:
const entryFile = Path.join(__dirname, './src/index.js')
// OR: Multiple files with globbing (can also be .js)
// const entryFiles = './src/*.js';
// OR: Multiple files in an array
// const entryFiles = ['./src/index.html', './some/other/directory/scripts.js'];

// Bundler options
const options = {
  outDir: './dist', // The out directory to put the build files in, defaults to dist
  outFile: 'bundle.js', // The name of the outputFile
  // publicUrl: './', // The url to serve on, defaults to dist
  // watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  // cache: true, // Enabled or disables caching, defaults to true
  // cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  // contentHash: false, // Disable content hash from being included on the filename
  // global: 'moduleName', // Expose modules as UMD under this name, disabled by default
  // minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  // scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  // target: 'browser', // Browser/node/electron, defaults to browser
  target: 'electron',
  // bundleNodeModules: false, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
  // logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
  // hmr: true, // Enable or disable HMR while watching
  hmr: false
  // hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  // sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  // hmrHostname: '', // A hostname for hot module reload, default to ''
  // detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
}

let electron = null

// Initializes a bundler using the entrypoint location and options provided
const bundler = new Bundler(entryFile, options)
bundler.on('bundled', () => {
  if (electron) {
    electron.kill()
  }
  electron = spawn('electron', ['.'])
})
// Call this to start bundling
bundler.bundle()
