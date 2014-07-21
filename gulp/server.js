'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');
var modRewrite = require('connect-modrewrite');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://localhost:8080'; // The location of your backend
var proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

function proxyMiddleware(req, res, next) {
  if (req.url.indexOf(proxyApiPrefix) !== -1) {
    proxy.web(req, res);
  } else {
    next();
  }
}

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: [
        proxyMiddleware,
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ]
    },
    browser: browser
  });
}

gulp.task('jshint', function () {
  return gulp.src('backend/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('backend', ['jshint'],function () {
  $.nodemon({
    script: 'backend/server.js',
    ext: 'js',
    ignore: ['gulp/**','node_modules/**', 'test/**', 'dist/**']
  })
    .on('change', ['jshint'])
    .on('restart', function () {
      console.log('restarted!')
    });
});

gulp.task('serve', ['backend', 'watch'], function () {
  browserSyncInit([
    'app',
    '.tmp'
  ], [
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/partials/**/*.html',
    'app/images/**/*'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', function () {
  browserSyncInit(['app', '.tmp'], null, []);
});

gulp.task('serve:e2e-dist', ['watch'], function () {
  browserSyncInit('dist', null, []);
});
