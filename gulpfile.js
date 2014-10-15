var gulp      = require('gulp'),
	sass        = require('gulp-ruby-sass'),
	imagemin    = require('gulp-imagemin'),
	changed     = require('gulp-changed'),
	browserSync = require('browser-sync');

gulp.task('sass', function () {
  gulp.src('./assets/sass/*.scss')
    .pipe(sass({compass: true}))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jpg', function() {
	gulp.src('./assets/img/**/*.jpg')
		.pipe(changed('./dist/img/'))
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./dist/css/**', './views/**'], {
        server: {
            baseDir: './',
            index: './views/index.html'
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () { 
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
});