var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  rimraf = require('gulp-rimraf'),
 	plugin = require('gulp-load-plugins')();

// пути к файлам
paths = {
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

//компиляция jade
gulp.task('jade', function () {
  gulp.src(paths.jade.compiled)
  .pipe(plugin.plumber())
  .pipe(plugin.jade({
      pretty: '\t'
    }))
  .pipe(gulp.dest(paths.jade.destination))
});

//слежка за файлами и перезагрузка сервера
gulp.task('watch', function () {
  gulp.watch(paths.jade.location, ['jade']);
  gulp.watch(paths.scss.location, ['compass']);
  gulp.watch([
    paths.html.location,
    paths.css.location
  ]).on('change', browserSync.reload);
});

//запуск сервера
gulp.task('server', function () {
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
    }));
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
    .pipe(gulp.dest(paths.dist.location));
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

//сборка dist    ПОКА НЕ РАБОТАЕТ
gulp.task('dist', ['extras','fonts','images','jade','compass'])
gulp.task('build', ['clean'], function () {
  gulp.start('dist');
});

gulp.task('default', ['server', 'watch']);
