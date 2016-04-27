var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');

var input = 'assets/sass/**/*.scss';
var output = 'dist/css';

var bootstrapSass = {
	in: './node_modules/bootstrap-sass/'
    };

gulp.task('copyfonts', function() {
    gulp.src('assets/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('autoprefixer', function () {
  return gulp.src('dist/css/app.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('icons', function() {
    return gulp.src('assets/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
	.pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(sourcemaps.write())
    //.pipe(sass())
    .pipe(gulp.dest(output));
});

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  sourceComments: 'map'
  //includePaths: [bootstrapSass.in + 'assets/stylesheets']
};

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass', 'autoprefixer'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'autoprefixer', 'icons', 'watch']); 