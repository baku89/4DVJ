/* global process */
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const nib = require('nib')
const electron = require('electron-connect').server.create({
  path: "build"
})

const webpackStream = require('webpack-stream')
const webpack = require('webpack')

gulp.task('webpack', () => {
  "use strict"
  
  let config = {
    watch: false,
    entry: {
      app: './src/app.js'
    },
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'babel-loader'},
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.(vert|frag|glsl)$/, loaders:['raw-loader','glslify-loader']},
      ]
    }
  }

  return gulp.src('')
    .pipe(webpackStream(config, null, (err, stats)=> {
      if (!err) {
        $.util.log(stats.toString({
          colors: $.util.colors.supportsColor,
          chunks: false,
          chunkModules: false
        }))
      }
    }))


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

// gulp.task('babel', function(){
// 	return gulp.src('src/**/*.js')
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init())
//     .pipe($.babel({presets: ['es2015']}))
//     .pipe($.sourcemaps.write())
//     .pipe(gulp.dest('build'))
// })

//==================================================

gulp.task('lint', () => {
  return gulp.src('./src/**/*.js')
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
})

//==================================================

gulp.task('default', ['jade', 'stylus', 'lint', 'webpack'], () => {
  electron.start()
  gulp.watch('./src/**/*.jade', ['jade'])
  gulp.watch('./src/**/*.styl', ['stylus'])
  gulp.watch('./src/**/*.js', ['lint', 'webpack'])

  gulp.watch('./build/**/*', electron.reload)
})
