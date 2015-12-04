/* global process */
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const nib = require('nib')
const webpack = require('webpack')
const browserSync = require('browser-sync').create()

let developmentMode = true

gulp.task('webpack', () => {
  let config = {
    watch: developmentMode,
    entry: {
      bootstrap: './src/bootstrap.js',
      app: './src/app.js'
    },
    output: {
      filename: '[name].js'
    },
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
    amd: {jQuery: true},
    target: 'web',
    resolve: {
      modulesDirectories: ["web_modules", "node_modules"]
    },
    "eslint": {
      configFile: './.eslintrc',
      formatter: require('eslint-friendly-formatter'),
      failOnError: true
    }
  }

  if (developmentMode) {
    config.devtool = 'inline-source-map'
  } else {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    )
  }

  return gulp.src('./src/main.js')
    .pipe($.plumber())
    .pipe($.webpack(config))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

//==================================================

gulp.task('jade', () => {
	return gulp.src('./src/*.jade')
    .pipe($.plumber())
    .pipe($.data(()=> {
      return require('./src/includes/data.json')
    }))
		.pipe($.jade({pretty: developmentMode}))
		.pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

//==================================================

gulp.task('stylus', () => {
	return gulp.src('./src/**/*.styl')
    .pipe($.plumber())
		.pipe($.stylus({use: nib(), compress: !developmentMode}))
    .pipe($.autoprefixer())
		.pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
})

//==================================================

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './public'
    },
    open: true
  })
})

//==================================================

gulp.task('watch', () => {
  gulp.watch('./src/**/*.jade', ['jade'])
  gulp.watch('./src/**/*.styl', ['stylus'])
  gulp.watch('./public/**/*.js', browserSync.reload)
})

//==================================================

gulp.task('release', () => {
  developmentMode = false
  process.env.NODE_ENV = 'production'
})

//==================================================

gulp.task('default', ['jade', 'stylus', 'webpack', 'watch', 'browser-sync'])
gulp.task('build', ['release', 'jade', 'stylus', 'webpack'])