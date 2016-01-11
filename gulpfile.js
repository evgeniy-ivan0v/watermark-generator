var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  php = require('gulp-connect-php'),
 	plugin = require('gulp-load-plugins')();
  


// добавление внешних js зависимостей 
/*browserify.shim = require('browserify-shim')
var shim = {
  jquery : {
    path: 'dev/bower/jquery/dist/jquery.js',
    exports: 'jquery'
  }
};*/

// пути к файлам
var paths = {
 jade: {
    location: 'dev/jade/**/*.jade',
    compiled: 'dev/jade/index.jade',
    destination: 'dist/'
  },
 scss: {
    location: 'dev/scss/**/*.scss',
    destination: 'dist/css/'
  },
 compass: {
    configFile  : 'config.rb',
    cssFolder   : 'dist/css',
    scssFolder  : 'dev/scss'
  },
 browserSync : {
      baseDir : 'dist'
  },
  html: {
    mainFile: 'dist/index.html',
    location: 'dist/*.html'
  },
  css: {
    location: 'dist/css/**/*.css'
  },
  fonts: {
    location: 'dev/fonts/**/*.+(eot|svg|ttf|woff|woff2)',
    destination: 'dist/fonts'
  },
  js: {
    mainFile: 'dev/js/app.js',
    locationDev: 'dev/js/**/*.js',
    location: 'dist/js/**/*.js',
    destination: 'dist/js/'
  },
  php: {
    location: './dist/backend/**/*.php'
  },
  images: {
    location: 'dev/images/**/*',
    destination: 'dist/images'
  },
  dev : {
    location: 'dev',
    allFile: 'dev/*.*'
  },
  dist: {
    location: 'dist',
    location: 'dist/*.*'
  }
};

//сборка модулей js
gulp.task('js', function () {
  gulp.src(paths.js.mainFile)
    .pipe(plugin.plumber())
    .pipe(plugin.browserify({debug: true})).on("error", log)
    .pipe(plugin.rename('main.js'))
    .pipe(gulp.dest(paths.js.destination));
});

//компиляция jade
gulp.task('jade', function () {
  gulp.src(paths.jade.compiled)
  .pipe(plugin.plumber())
  .pipe(plugin.jade({
      pretty: '\t'
    })).on("error", log)
  .pipe(gulp.dest(paths.jade.destination))
});

//слежка за файлами и перезагрузка сервера
gulp.task('watch', function () {
  gulp.watch(paths.jade.location, ['jade']);
  gulp.watch(paths.scss.location, ['compass']);
  gulp.watch(paths.js.locationDev, ['js']);
  gulp.watch([
    paths.html.location,
    paths.css.location,
    paths.js.location,
    paths.php.location
  ]).on('change', browserSync.reload);
});

gulp.task('php', function() {
    php.server({ 
      base: '/dist',
      keepalive: true
    });
});

//запуск сервера
gulp.task('server',['php'], function () {
  browserSync({
    port: 9000,
    server: {
      baseDir: paths.browserSync.baseDir
    }
  });
});

//компиляция scss
gulp.task('compass', function () {
  gulp.src(paths.scss.location)
    .pipe(plugin.plumber())
    .pipe(plugin.compass({
      config_file: paths.compass.configFile,
      css: paths.compass.cssFolder,
      sass: paths.compass.scssFolder
    })).on("error", log);
});

// Перенос шрифтов
gulp.task('fonts', function() {
  gulp.src(paths.fonts.location)
    .pipe(plugin.filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
    .pipe(gulp.dest(paths.fonts.destination))
});

// Остальные файлы, такие как favicon.ico и пр.
gulp.task('extras', function () {
  return gulp.src('dev/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('extrasphp', function () {
  return gulp.src('dev/backend/**/*.*')
    .pipe(gulp.dest('dist/backend'));
});

// Картинки
gulp.task('images', function () {
  return gulp.src(paths.images.location)
    .pipe(plugin.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.images.destination));
});

// Очистка
gulp.task('clean', function() {
  return gulp.src('dist', { read: false }) 
    .pipe(plugin.rimraf());
});

//сборка dist
gulp.task('dist', ['compass','extras','extrasphp','fonts','images','jade','js']);

gulp.task('build', ['clean'], function () {
  gulp.start('dist');
});

gulp.task('default', ['build','server'], function () {
  gulp.start('watch');
});


var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
};