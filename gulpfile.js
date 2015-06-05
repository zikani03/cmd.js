'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');

var lib = 'src/lib/*.js';

gulp.task('lib', function() {
  return gulp.src(lib)
    .pipe(jshint())
    .pipe(concat('cmd.lib.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch(lib, ['lib']);
});

// TODO: figure out how to coordinate the build of libs with babel compilation
gulp.task('babel', function () {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build'));
});

gulp.task('default', ['babel', 'lib']);
gulp.task('start', ['default', 'watch']);
