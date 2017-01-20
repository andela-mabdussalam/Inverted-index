var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;



gulp.task('browserSync', function() {
 browserSync.init({
   server: {
     baseDir: 'src/'
   },
 });
});

gulp.task('default', ['browserSync'], function () {
  gulp.watch(['views/*.html'], reload);
  gulp.watch(['src/js/*.js'], reload);
  gulp.watch(['src/*.html'], reload);
  gulp.watch(['jasmine/spec/*.js'], reload);
});