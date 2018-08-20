import * as gulp from 'gulp';

import Config from '../../config';

import * as cordova from 'gulp-cordova-builder';

export = () => {
  return gulp.src(Config.APP_DEST)
    .pipe(cordova.create({
      dist: 'dist/cordova',
      name: 'angular-seed',
      namespace: 'com.example',
      xmlConfig: `${Config.APP_SRC}/cordova.xml`
    }))
    .pipe(cordova.addPlatform('ios'))
    // .pipe(cordova.addPlugin('cordova-plugin-media'))
    .pipe(cordova.build('ios'));
};
