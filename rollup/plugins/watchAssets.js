// https://github.com/bennypowers/rollup-plugin-watch-assets

import path from 'path';
import globby from 'globby';

const unary = f => x => f(x);
const resolve = unary(path.resolve);

export default function watchAssets({ assets }) {
  return {
    name: 'watch-assets',
    async load() {
      const watch = assetPath => this.addWatchFile(assetPath);
      (await globby(assets))
        .map(resolve)
        .forEach(watch);
    },
  };
}
