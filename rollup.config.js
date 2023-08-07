import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { copy } from '@web/rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import postcss from 'rollup-plugin-postcss';
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import watchAssets from './rollup/plugins/watchAssets.js';

const projectRootDir = path.resolve(__dirname);
const sourceDir = './src'
const targetDir = './dist'
const pagesRootDir = '/pages'

const pagePaths = [
  '/home',
  '/examples/calculator',
  '/examples/carousel',
  '/examples/dropdowns',
  '/examples/tabs',
]

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx']

export default pagePaths.map(pagePath => ({
  input: path.join(sourceDir, pagesRootDir, pagePath + '.js'),
  output: {
    format: 'es',
    dir: path.dirname(path.join(targetDir, pagesRootDir, pagePath + '.js')),
  },
  watch: {
    include: './src/**/*',
    chokidar: {
      usePolling: true
    }
  },
  plugins: [
    watchAssets({ assets: ['./src/**/*.html', './src/**/*.css'] }),
    alias({
      entries: [{
        find: '/src',
        replacement: path.resolve(projectRootDir, 'src')
      }]
    }),
    babel({
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
      exclude: '/^(.+\/)?node_modules\/.+$/',
      extensions: targetExtensions
    }),
    nodeResolve({
      extensions: targetExtensions,
    }),
    commonjs({
      extensions: targetExtensions,
    }),
    peerDepsExternal(),
    postcss({
      plugins: [
        cssimport(),
        autoprefixer(),
      ]
    }),
    terser(),
    copy({
      rootDir: `${path.dirname(path.join(sourceDir, pagesRootDir, pagePath + '.js'))}`,
      patterns: `*.{html,jpg,json,svg}`,
      exclude: 'node_modules',
    })
  ]
}));
