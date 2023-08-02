import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import watchAssets from './rollup/plugins/watchAssets.js';

const outputDir = './dist'
const pagesSubpath = '/pages'
const pages = [
  'home',
  'calculator',
]

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx']

export default pages.map(page => ({
  input: './src' + pagesSubpath + '/' + page + '.js',
  output: {
    format: 'es',
    dir: outputDir + pagesSubpath,
  },
  watch: {
    include: './src/**/*',
    chokidar: {
      usePolling: true
    }
  },
  plugins: [
    watchAssets({ assets: ['./src/**/*.html', './src/**/*.css'] }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: targetExtensions
    }),
    nodeResolve({
      extensions: targetExtensions,
    }),
    commonjs({
      extensions: targetExtensions,
    }),
    peerDepsExternal(),
    terser(),
    copy({
      targets: [
        { src: ['./src' + pagesSubpath + '/*', '!**/*.js'], dest: outputDir + pagesSubpath },
      ]
    })
  ]
}));
