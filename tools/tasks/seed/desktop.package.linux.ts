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
      platforms: ['linux-ia32', 'linux-x64'],
      platformResources: {
        linux: {
        }
      }
    }))
    .pipe(gulp.dest(''));
};
