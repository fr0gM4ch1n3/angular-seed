import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

/**
 * Executes the build task, copying all TypeScript files over to the `dist/tmp` directory.
 */
export = () => {
  return gulp.src([
    join(Config.TMP_DIR, 'node_modules/**/*')
  ])
    .pipe(gulp.dest(join(Config.APP_DEST, 'node_modules')));
};
