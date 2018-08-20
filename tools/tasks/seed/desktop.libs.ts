import * as gulp from 'gulp';
import { relative, join } from 'path';
import * as newer from 'gulp-newer';
import { ExtendPackages } from '../../config/seed.config.interfaces';
import Config from '../../config';

export = () => {
  const src = [
    'node_modules/@angular/**/*',
    'node_modules/rxjs/**/*',
    'node_modules/.tmp/**/*'
  ];

  const additionalPkgs: ExtendPackages[] = Config.DESKTOP_PACKAGES;
  additionalPkgs.forEach((pkg) => {
    if (typeof (pkg.name) !== 'undefined') {
      src.push(`node_modules/${pkg.name}/**/*`);
    }
  });

  src.push(...Config.NPM_DEPENDENCIES.map(x => relative(Config.PROJECT_ROOT, x.src)));

  console.log(src);

  return gulp.src(src, { base: 'node_modules' })
    .pipe(newer({
      dest: join(Config.APP_DEST + '/node_modules'),
      map: function (path: String) { return path.replace('.ts', '.js').replace('.scss', '.css'); }
    }))
    .pipe(gulp.dest(join(Config.APP_DEST + '/node_modules')));
};
