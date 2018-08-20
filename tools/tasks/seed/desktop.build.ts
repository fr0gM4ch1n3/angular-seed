import * as gulp from 'gulp';
import { join } from 'path';
import * as newer from 'gulp-newer';

import Config from '../../config';

export = () => {
  const src = [
    join(Config.APP_SRC, 'package.json')
  ];
  return gulp.src(src)
    .pipe(newer({
      dest: Config.APP_DEST,
      map: function (path: String) { return path.replace('.ts', '.js').replace('.scss', '.css'); }
    }))
    .pipe(gulp.dest(Config.APP_DEST));
};
