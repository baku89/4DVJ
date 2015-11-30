/* global process */
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const nib = require('nib')
const electron = require('electron-connect').server.create({
  path: "build"
})
const webpack = require('webpack')


let developmentMode = true

gulp.task('webpack', () => {
  let config = {
    watch: true,
    entry: {
      electron: './src/electron.js',
      main: './src/main.js'
    },
    output: {
      filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module: {
      preLoaders: [
        {test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'eslint'}
      ],
      loaders: [
        {test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'babel-loader'},
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.(vert|frag|glsl)$/, loaders:['raw-loader','glslify-loader']}
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/vertx/)
    ],
    target: 'atom',
    "node": {
      __dirname: true
    },
    "eslint": {
      configFile: './.eslintrc',
      formatter: require('eslint-friendly-formatter'),
      failOnError: true
    }
  }

  return gulp.src('')
    .pipe($.plumber())
    .pipe($.webpack(config))
    .pipe(gulp.dest('build'))
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

gulp.task('watch', () => {
  electron.start()
  gulp.watch('./src/**/*.jade', ['jade', electron.reload])
  gulp.watch('./src/**/*.styl', ['stylus', electron.reload])
  gulp.watch('./build/**/*', electron.reload)
})

//==================================================

gulp.task('default', ['jade', 'stylus', 'webpack', 'watch'])
