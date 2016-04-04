var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
	livereload = require('gulp-livereload'),
	minifyCSS   = require('gulp-minify-css');

var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var cleanDir = require('gulp-clean');
var minifyJs = require('gulp-uglify');
var minifyHtml = require('gulp-htmlmin');
var series = require('stream-series');


gulp.task('inject', function() {
	return gulp.src('./web/index.html')
	.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
	.pipe(inject(gulp.src([
			'web/dist/js/**/*.js',
			'web/app/app.js',
			'web/app/routes/routes.js',
			'web/app/services/*.js',
			'web/dist/css/*.css',
			'web/styles/custom.css'
		],{read: false})))
	.pipe(gulp.dest('./web'));
});



var bootstrapSass = {
	in: './node_modules/bootstrap-sass/'
};

gulp.task('copyfonts', function() {
	gulp.src('assets/fonts/**/*.{ttf,woff,eof,svg}')
		.pipe(gulp.dest('web/dist/fonts'));
});

gulp.task('autoprefixer', function () {
	return gulp.src('web/dist/css/app.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('web/dist/css'));
});

gulp.task('icons', function() {
	return gulp.src('assets/fonts/**.*')
		.pipe(gulp.dest('web/dist/fonts'));
});

gulp.task('assets-js-copy', function() {
	return gulp.src(['assets/js/**/*.js'])
		.pipe(gulp.dest('web/dist/js/'));
});

gulp.task('assets-img-copy', function() {
	return gulp.src(['assets/img/**/*.*'])
		.pipe(gulp.dest('web/dist/img/'));
});

gulp.task('sass', function () {
	return gulp
		// Find all `.scss` files from the `stylesheets/` folder
		.src("assets/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		//.pipe(sass())
		.pipe(gulp.dest("web/dist/css"));
});

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded',
	sourceComments: 'map'
	//includePaths: [bootstrapSass.in + 'assets/stylesheets']
};


gulp.task('watch', function() {
	livereload.listen();
	gulp.watch("./web/**/*.js", browserSync.reload);
	gulp.watch("./web/**/*.html", browserSync.reload);
	gulp.watch("assets/sass/**/*.scss", ['sass', 'autoprefixer']);
});

gulp.task('start-server', function() {
	browserSync.init({
		server: {
			baseDir: "./web",
			routes: {
				"/node_modules": "node_modules",
				"/bower_components": "bower_components",
				"/static": "static",
				"/web": "web"
			}
		},
		port : 3003,
		ghostMode: false
	});
});


// Static server
gulp.task('serve' , function() {
	runSequence(
		'assets-js-copy',
		'assets-img-copy',
		'sass',
		'icons',
		'autoprefixer',
		'inject',
		'watch',
		'start-server'
	);
});

// Build Tasks

// Copy all files
gulp.task('copy', function() {
	gulp.src(['web/**/*'])
		.pipe(gulp.dest('build/web/'));

	gulp.src(bowerFiles())
		.pipe(gulp.dest('build/web/lib/vendor'));
});

gulp.task('minify-css', function() {
	gulp.src('build/web/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest( 'build/web/'));
});

gulp.task('js-minify', function () {
	gulp.src("build/web/**/*.js")
		.pipe(minifyJs())
		.pipe(gulp.dest('build/web/'));
});

gulp.task('html-minify', function () {
	gulp.src("build/web/**/*.html")
		.pipe(minifyHtml({collapseWhitespace: true}))
		.pipe(gulp.dest('build/web/'));
});

gulp.task('inject-library', function () {
	gulp.src('./build/web/index.html')
		.pipe(inject(series(
			gulp.src([
				'./build/web/lib/vendor/jquery.js',
				'./build/web/lib/vendor/bootstrap.js',
				'./build/web/lib/vendor/angular.js',
				'./build/web/lib/vendor/angular-ui-router.js',
				'./build/web/lib/vendor/ocLazyLoad.js'
			], {read: false}),
			gulp.src([
				'./build/web/lib/vendor/*',
				'!./build/web/lib/vendor/jquery.js',
				'!./build/web/lib/vendor/bootstrap.js',
				'!./build/web/lib/vendor/angular.js',
				'!./build/web/lib/vendor/angular-ui-router.js',
				'!./build/web/lib/vendor/ocLazyLoad.js'
			], {read: false})
		), {name: 'bower', relative : true}))
		.pipe(inject(gulp.src([
			'build/web/dist/js/**/*.js',
			'build/web/app/app.js',
			'build/web/app/routes/routes.js',
			'build/web/app/services/*.js',
			'build/web/dist/css/*.css',
			'build/web/styles/custom.css'
		],{read: false}), {name: 'inject', relative : true}))
		.pipe(gulp.dest('./build/web'));
});

gulp.task('clean', function () {
	gulp.src("build/", {read: false})
		.pipe(cleanDir());
});

gulp.task('pre-build', function () {
	runSequence(
		'assets-js-copy',
		'assets-img-copy',
		'sass',
		'icons',
		'autoprefixer',
		'copy'
	);
});

gulp.task('post-build', function () {
	runSequence(
		'minify-css',
		'js-minify',
		'html-minify',
		'inject-library'
	);
});

// Tentative - Won't work sometimes. Instead Use clean --->  pre-build ----> post-build commands
gulp.task('build', function () {
	runSequence(
		'clean',
		'assets-js-copy',
		'assets-img-copy',
		'sass',
		'icons',
		'autoprefixer',
		'copy',
		'minify-css',
		'js-minify',
		'inject-library',
		'html-minify'
	);
});

gulp.task('build-serve', function () {
	browserSync.init({
		server: {
			baseDir: "./build/web"
		},
		port: 4000,
		ghostMode: false
	});
});

