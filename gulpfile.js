var gulp = require('gulp'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	path = ['./app/app.js','./app/components/*/*.js'];

    gulp.task('default', function() {
    	 return gulp.src(path)
        	.pipe(concat('bundle.js'))
        	.pipe(gulp.dest('app'));
    });

    gulp.task('watch', function() {
    	gulp.watch(['./app/app.js', './app/components/*/*.js'], ['default'])
    });
