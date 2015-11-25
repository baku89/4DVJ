/* global process */
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const nib = require('nib')
const electron = require('electron-connect').server.create({
  path: "build"
})

//==================================================

gulp.task('jade', () => {
	return gulp.src('./src/**/*.jade')
    .pipe($.plumber())
		.pipe($.jade())
		.pipe(gulp.dest('build'))
})

//==================================================

gulp.task('stylus', () => {
	return gulp.src('./src/**/*.styl')
    .pipe($.plumber())
		.pipe($.stylus({use: nib()}))
		.pipe(gulp.dest('build'))
})

//==================================================

gulp.task('babel', function(){
	return gulp.src('src/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({presets: ['es2015']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build'))
})

//==================================================

gulp.task('lint', () => {
  return gulp.src('./src/**/*.js')
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
})

//==================================================

gulp.task('default', ['jade', 'stylus', 'lint', 'babel'], () => {
  electron.start()
  gulp.watch('./src/**/*.jade', ['jade', electron.restart])
  gulp.watch('./src/**/*.styl', ['stylus', electron.restart])
  gulp.watch('./src/**/*.js', ['lint', 'babel', electron.restart])
})
