import * as gulp from 'gulp';
import * as electron from 'gulp-electron';
const packageJson = require('../../../src/client/package.json');

export = () => {
  gulp.src('')
    .pipe(electron({
      src: './dist/prod',
      packageJson: packageJson,
      release: './dist/release',
      cache: './dist/cache',
      version: 'v2.0.7',
      packaging: true,
      platforms: ['win32-x64'],
      platformResources: {
        win: {
          'version-string': packageJson.version,
          'file-version': packageJson.version,
          'product-version': packageJson.version,
          'icon': './src/client/assets/logo.ico'
        }
      }
    }))
    .pipe(gulp.dest(''));
};


