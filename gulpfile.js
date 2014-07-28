var gulp        = require('gulp'),
	compass     = require('gulp-compass'),
	imagemin    = require('gulp-imagemin'),
	changed     = require('gulp-changed'),
	browserSync = require('browser-sync');

gulp.task('compass', function() {
	gulp.src('./assets/sass/*.scss')
	.pipe(compass({
		config_file: './config.rb',
		css: './dist/css',
		sass: './assets/sass',
	}))
	.on('error', function(error){})
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
    browserSync.init(['./dist/css/**', './views/**'] {
        server: {
            baseDir: './',
            index: './views/index.html'
        }
    });
});

gulp.task('watch', ['compass', 'browser-sync'], function () { 
    gulp.watch('./assets/sass/**/*.scss', ['compass']);
});