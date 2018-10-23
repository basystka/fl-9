const	gulp		= require('gulp'),
		uglify		= require('gulp-uglify-es').default,
		cssnano		= require('gulp-cssnano'),
		del			= require('del'),
		rename		= require('gulp-rename'),
		runSequence	= require('run-sequence'),
		connect 	= require('gulp-connect'),
		concat		= require('gulp-concat'),
		scss		= require('gulp-sass'),
		jshint 		= require('gulp-jshint'),
		stylish 	= require('jshint-stylish'),
		sourcemaps	= require('gulp-sourcemaps'),
		watch 		= require('gulp-watch'),
		moment		= require('moment');

let cssmap	= gulp.src('./src/sass/*.scss');
let jsmap	= gulp.src(['./node_modules/moment/moment.js', './src/js/canvasState.js', './src/js/clock.js', './src/js/app.js']);

gulp.task('make-css', function(){
	return cssmap
		.pipe(scss())
		.pipe(cssnano())
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./bin/css'))
		.pipe(connect.reload());
});

gulp.task('make-js', function(){
	return jsmap
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./bin/js'))
		.pipe(connect.reload());
});
gulp.task('make-bin', function(){
	runSequence('make-css', 'make-js');
});

gulp.task('put-html', function(){
	return gulp.src('./src/app.html')
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./bin'))
		.pipe(connect.reload());
});

gulp.task('make-prod', function(){
	return (
	[gulp.src('./bin/*.html')
		.pipe(gulp.dest('./dist'))],
	[gulp.src('./bin/js/*.js')
		.pipe(gulp.dest('./dist/js'))],
	[gulp.src('./bin/css/*.css')
		.pipe(gulp.dest('./dist/css'))]
)});

gulp.task('clear-bin', function(){
	return del.sync('./bin/**/*.min.*')
});

gulp.task('clear-prod', function(){
	return del.sync('./dist/**/*.min.*')
});

gulp.task('clear-all', function(){
	del.sync('./bin/**')
	del.sync('./dist/**')
});

gulp.task('build', function(){
	runSequence(['clear-bin'], ['make-bin'], 'put-html');
});

gulp.task('build-prod', function(){
	runSequence(['clear-prod'], ['make-prod']);
});

gulp.task('start', function() {
	connect.server({
		root: 'bin',
		port: 8080,
		livereload: true
	});
});
 
gulp.task('html', function () {
	gulp.src('./bin/**/*.*')
		.pipe(gulp.dest('./bin'))
		.pipe(connect.reload());
});

gulp.task('livereload', function() {
	gulp.src(['./bin/css/*.css', './bin/js/*.js'])
		.pipe(watch(['./bin/css/*.css', './bin/js/*.js']))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./bin/*.html'], ['html']);
	gulp.watch('./bin/css/*.css', ['cssmap']);
	gulp.watch('./bin/js/*.js', ['jsmap']);
});

gulp.task('default', function () {
	runSequence('start', 'build', 'livereload', 'watch');
});
	
gulp.task('jshint', function () {
	return gulp.src('./src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});