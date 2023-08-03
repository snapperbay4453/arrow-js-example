import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
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
    alias({
      entries: [{
        find: '/src',
        replacement: path.resolve(projectRootDir, 'src')
      }]
    }),
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
    postcss({
      plugins: [
        cssimport(),
        autoprefixer(),
      ]
    }),
    terser(),
    copy({
      targets: [
        { src: ['./src' + pagesSubpath + '/**/*.html'], dest: outputDir + pagesSubpath },
      ]
    })
  ]
}));
