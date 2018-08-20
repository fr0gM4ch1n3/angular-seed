import * as gulp from 'gulp';
import * as gulpInstall from 'gulp-install';

import Config from '../../config';

/**
 * Automatically install npm packages/dependencies
 * if the relative configurations are found in the gulp file stream respectively
 */
export = () => {
  return gulp.src([`${Config.TMP_DIR}/package.json`])
    .pipe(gulp.dest(Config.TMP_DIR))
    .pipe(gulpInstall());
};
