const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const testSync = require('browser-sync').create();

const reload = browserSync.reload;

const browserify = require('gulp-browserify');

const rename = require('gulp-rename');

const path = require('path');

const karma = require('karma').Server;

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
   .pipe(browserify())
   .pipe(rename('bundle.js'))
   .pipe(gulp.dest('jasmine/build'));
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src/',
      index: 'index.html'
    },
    port: 8000,
    ui: false
  });
});

gulp.task('karma', ['scripts'], (done) => {
 karma.start({
   configFile: path.resolve('karma.conf.js'),
   singleRun: true
 }, () => {
   done();
 });
});


gulp.task('testSync', () => {
  testSync.init({
    server: {
      baseDir: ['src/js', 'jasmine'],
      index: 'SpecRunner.html'
    },
    port: 8888,
    ui: false
  });
});

gulp.task('default', ['browserSync', 'scripts', 'testSync'], () => {
  gulp.watch(['views/*.html'], reload);
  gulp.watch(['src/js/*.js'], reload);
  gulp.watch(['src/*.html'], reload);
  gulp.watch(['jasmine/spec/*.js'], testSync.reload);
  gulp.watch(['src/js/invertedindex.js', 'jasmine/spec/inverted-index-test.js'], ['scripts']);
});

// gulp test
gulp.task('test', ['scripts', 'karma']);
