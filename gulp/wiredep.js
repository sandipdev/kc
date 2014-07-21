'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: ['modernizr']
    }))
    .pipe(gulp.dest('app'));
});
