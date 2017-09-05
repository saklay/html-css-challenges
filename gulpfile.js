'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var concat       = require('gulp-concat');
var del          = require('del');
var fs           = require('fs');
var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass');
// var sassLint     = require('gulp-sass-lint');
var dataPath     = 'src/data'; // set directory for the json data files
var configPath   = 'src/config'; // set directory for the json site config files;

/**
 * Compile CSS
 */
gulp.task('css', function() {
  return gulp.src([
      'src/assets/scss/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ios_saf 8', 'IE > 9'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    xip: false
  });
});

/**
 * Clean tasks
 */
gulp.task('clean', function () {
  return del.sync([
    './dist/*'
  ], {
    force: true
  });
});

/**
 * Watch for changes
 */
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    xip: false
  });

  gulp.watch('src/assets/js/*.js', ['scripts']);
  gulp.watch('src/assets/scss/*.scss', ['css']);

  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

/**
 * Default tasks for CLI
 */
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['css']);
// gulp.task('build', ['clean', 'css']);

/**
 * Helpers
 */

// Fetch all folder names inside a specific directory (dir)
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}
