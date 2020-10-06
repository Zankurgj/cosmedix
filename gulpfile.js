let preprocessor = 'scss'; // Preprocessor (sass, scss)
let fileswatch = 'html,htm,txt,json,md'; // List of files extensions for watching & hard reload (comma separated)
let imageswatch = 'jpg,jpeg,png,webp,svg,woff2'; // List of files extensions for watching & hard reload (comma separated)

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const fileInclude = require('gulp-file-include');

// Local Server

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app' },
    notify: false,
    // online: false, // Work offline without internet connection
  });
}

// Custom Styles

function styles() {
  return src('app/sass/main.' + preprocessor + '')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(
      autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })
    )
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

// Scripts & JS Libraries

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/vanilla-lazyload/dist/lazyload.min.js',
    'node_modules/swiper/swiper-bundle.js',
    'app/js/app.js', // app.js. Always at the end
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify()) // Minify JS (opt.)
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

// Images

function images() {
  return src('app/images/src/**/*')
    .pipe(newer('app/images/dest'))
    .pipe(imagemin())
    .pipe(dest('app/images/dest'));
}

function cleanimg() {
  return del('app/images/dest/**/*', { force: true });
}

// Deploy

function deploy() {
  return src('app/').pipe(
    rsync({
      root: 'app/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // include: ['*.htaccess'], // Included files
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
      recursive: true,
      archive: true,
      silent: false,
      compress: true,
    })
  );
}

// SVG Sprite
const config = {
  shape: {
    dimension: {
      // Set maximum dimensions
      maxWidth: 500,
      maxHeight: 500,
    },
    spacing: {
      // Add padding
      padding: 0,
    },
  },
  mode: {
    symbol: {
      dest: '.',
    },
  },
};

gulp.task('svg-sprite', function (cb) {
  return gulp
    .src('app/images/svg-icon/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('app/images/sprites'));
});

function fileinclude() {
  return src(['app/html/pages/*.html'])
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(dest('app/'))
    .pipe(browserSync.stream());
}

// Watching

function startwatch() {
  watch('app/sass/**/*.' + preprocessor + '', parallel('styles'));
  watch(['app/**/*.js', '!app/js/*.min.js'], parallel('scripts'));
  watch(['app/html/**/*.html'], parallel('fileinclude'));
  watch(['app/**/*.{' + imageswatch + '}'], parallel('images'));
  watch(['app/**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.fileinclude = fileinclude;
exports.default = parallel(
  images,
  styles,
  scripts,
  browsersync,
  fileinclude,
  startwatch
);
