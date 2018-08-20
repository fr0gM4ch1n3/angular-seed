import * as gulp from 'gulp';
import * as electron from 'gulp-electron';

import Config from '../../config';
const packageJson = require('../../../src/client/package.json');

export = () => {
  gulp.src('')
    .pipe(electron({
      src: Config.PROD_DEST,
      packageJson: packageJson,
      release: Config.ELECTRON_DEST,
      cache: Config.ELECTRON_CACHE_DIR,
      version: Config.ELECTRON_VERSION,
      packaging: Config.ELECTRON_PACKAGING,
      platforms: ['darwin-x64'],
      platformResources: {
        darwin: {
          CFBundleDisplayName: packageJson.name,
          CFBundleIdentifier: packageJson.name,
          CFBundleName: packageJson.name,
          CFBundleVersion: packageJson.version,
          icon: './src/client/assets/logo.icns'
        }
      }
    }))
    .pipe(gulp.dest(''));
};
