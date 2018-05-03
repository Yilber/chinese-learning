// Core
var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var HanziWriter = require('hanzi-writer');

//CSS
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');

// javascript
var uglify = require('gulp-uglify');
var babel  = require("gulp-babel");
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

// Utilities
var jsonminify = require('gulp-jsonminify');
var sourcemaps = require('gulp-sourcemaps');
var rename     = require('gulp-rename');
var htmlmin    = require('gulp-htmlmin');
var livereload = require('gulp-livereload');

// Path folders
var paths = {
    src: './src',
    dest: './dist',

    js: {
        src: './src/js',
        dest: './dist/js'
    },

    json: {
        src: './src/data',
        dest: './dist/js'
    },

    fonts: {
        src: './src/fonts',
        dest: './dist/css'
    },

    images: {
        src: './src/images',
        dest: './dist'
    },

    bootstrap: {
        src: [
            './src/js/bootstrap/index.js',
            './src/js/bootstrap/transition.js',
            './src/js/bootstrap/alert.js',
            './src/js/bootstrap/button.js',
            './src/js/bootstrap/carousel.js',
            './src/js/bootstrap/collapse.js',
            './src/js/bootstrap/dropdown.js',
            './src/js/bootstrap/modal.js',
            './src/js/bootstrap/tooltip.js',
            './src/js/bootstrap/popover.js',
            './src/js/bootstrap/scrollspy.js',
            './src/js/bootstrap/tab.js',
            './src/js/bootstrap/affix.js'
        ],
        dest: 'dist/js'
    },

    styles: {
        src: './src/scss',
        dest: './dist/css'
    },

    views: {
        src: './src/views',
        dest: './dist'
    },
};

// Watch with html server
gulp.task('watch', ['minify-html','styles','scripts'], function() {
    console.log('Starting watch task');

    require('./server.js');

    gulp.watch( `${paths.views.src}/**/*.html`, ['minify-html'] );
    gulp.watch( `${paths.styles.src}/**/*.scss`, ['styles'] );
    gulp.watch( `${paths.js.src}/**/*.js`, ['scripts'] );
    gulp.watch( `${paths.json.src}/*.json`, ['dependencies'] );
    livereload.listen();
});

// Minify html files
gulp.task('minify-html', function() {
    console.log('Starting minify-html task');

    return gulp.src(`${paths.views.src}/**/*.html`)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.views.dest));
});

// Styles
gulp.task('styles', function() {
    console.log('Starting styles task');

    return gulp.src(`${paths.styles.src}/style.scss` )
        .pipe(plumber(function(err){
            console.log('Styles error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write() )
        .pipe(rename('style.css') )
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', ['dependencies'], function() {
    console.log('Starting scripts task');

    var scripts = [
        `${paths.js.src}/flashcards.js`,
        //`${paths.js.src}/main.js`
    ];

    return gulp.src(scripts)
        .pipe(plumber(function(err){
            console.log('Scripts error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(livereload());
});

gulp.task('dependencies', ['bootstrap'], function(){
    console.log('Starting dependencies task');

    var jsfiles = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/hanzi-writer/dist/hanzi-writer.min.js',
        `${paths.js.dest}/bootstrap.min.js`,
    ];

    var jsonfiles = [
        `${paths.json.src}/data.json`,
    ];

    gulp.src(jsfiles)
        .pipe(uglify({
            output: {
                comments: /^!/
            }
        }))
        .pipe(gulp.dest(paths.js.dest));

    gulp.src(jsonfiles)
        .pipe(jsonminify())
        .pipe(gulp.dest(paths.json.dest));
});

gulp.task('bootstrap', function(){
    console.log('Starting Bootstrap task');

    return gulp.src(paths.bootstrap.src)
        .pipe(plumber(function(err){
            console.log('Bootstrap error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
});
