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

    var characters = [
        './node_modules/hanzi-writer-data/人.json',
        './node_modules/hanzi-writer-data/山.json',
        './node_modules/hanzi-writer-data/日.json',
        './node_modules/hanzi-writer-data/月.json',
        './node_modules/hanzi-writer-data/木.json',
        './node_modules/hanzi-writer-data/刀.json',
        './node_modules/hanzi-writer-data/力.json',
        './node_modules/hanzi-writer-data/又.json',
        './node_modules/hanzi-writer-data/口.json',
        './node_modules/hanzi-writer-data/囗.json',
        './node_modules/hanzi-writer-data/土.json',
        './node_modules/hanzi-writer-data/夕.json',
        './node_modules/hanzi-writer-data/大.json',
        './node_modules/hanzi-writer-data/小.json',
        './node_modules/hanzi-writer-data/女.json',
        './node_modules/hanzi-writer-data/子.json',
        './node_modules/hanzi-writer-data/寸.json',
        './node_modules/hanzi-writer-data/工.json',
        './node_modules/hanzi-writer-data/幺.json',
        './node_modules/hanzi-writer-data/弓.json',
        './node_modules/hanzi-writer-data/心.json',
        './node_modules/hanzi-writer-data/戈.json',
        './node_modules/hanzi-writer-data/手.json',
        './node_modules/hanzi-writer-data/水.json',
        './node_modules/hanzi-writer-data/火.json',
        './node_modules/hanzi-writer-data/田.json',
        './node_modules/hanzi-writer-data/目.json',
        './node_modules/hanzi-writer-data/示.json',
        './node_modules/hanzi-writer-data/糸.json',
        './node_modules/hanzi-writer-data/耳.json',
        './node_modules/hanzi-writer-data/衣.json',
        './node_modules/hanzi-writer-data/言.json',
        './node_modules/hanzi-writer-data/貝.json',
        './node_modules/hanzi-writer-data/走.json',
        './node_modules/hanzi-writer-data/足.json',
        './node_modules/hanzi-writer-data/金.json',
        './node_modules/hanzi-writer-data/門.json',
        './node_modules/hanzi-writer-data/隹.json',
        './node_modules/hanzi-writer-data/雨.json',
        './node_modules/hanzi-writer-data/食.json',
        './node_modules/hanzi-writer-data/馬.json',
        './node_modules/hanzi-writer-data/上.json',
        './node_modules/hanzi-writer-data/下.json',
        './node_modules/hanzi-writer-data/一.json',
        './node_modules/hanzi-writer-data/二.json',
        './node_modules/hanzi-writer-data/三.json',
        './node_modules/hanzi-writer-data/四.json',
        './node_modules/hanzi-writer-data/五.json',
        './node_modules/hanzi-writer-data/六.json',
        './node_modules/hanzi-writer-data/七.json',
        './node_modules/hanzi-writer-data/八.json',
        './node_modules/hanzi-writer-data/九.json',
        './node_modules/hanzi-writer-data/十.json',
        './node_modules/hanzi-writer-data/百.json',
        './node_modules/hanzi-writer-data/千.json',
        './node_modules/hanzi-writer-data/兩.json',
        './node_modules/hanzi-writer-data/你.json',
        './node_modules/hanzi-writer-data/妳.json',
        './node_modules/hanzi-writer-data/好.json',
        './node_modules/hanzi-writer-data/我.json',
        './node_modules/hanzi-writer-data/請.json',
        './node_modules/hanzi-writer-data/問.json',
        './node_modules/hanzi-writer-data/貴.json',
        './node_modules/hanzi-writer-data/姓.json',
        './node_modules/hanzi-writer-data/嗎.json',
        './node_modules/hanzi-writer-data/呢.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/叫.json',
        './node_modules/hanzi-writer-data/李.json',
        './node_modules/hanzi-writer-data/王.json',
        './node_modules/hanzi-writer-data/不.json',
        './node_modules/hanzi-writer-data/是.json',
        './node_modules/hanzi-writer-data/老.json',
        './node_modules/hanzi-writer-data/也.json',
        './node_modules/hanzi-writer-data/中.json',
        './node_modules/hanzi-writer-data/國.json',
        './node_modules/hanzi-writer-data/美.json',
        './node_modules/hanzi-writer-data/北.json',
        './node_modules/hanzi-writer-data/京.json',
        './node_modules/hanzi-writer-data/那.json',
        './node_modules/hanzi-writer-data/這.json',
        './node_modules/hanzi-writer-data/的.json',
        './node_modules/hanzi-writer-data/男.json',
        './node_modules/hanzi-writer-data/孩.json',
        './node_modules/hanzi-writer-data/他.json',
        './node_modules/hanzi-writer-data/她.json',
        './node_modules/hanzi-writer-data/兒.json',
        './node_modules/hanzi-writer-data/個.json',
        './node_modules/hanzi-writer-data/有.json',
        './node_modules/hanzi-writer-data/没.json',
        './node_modules/hanzi-writer-data/高.json',
        './node_modules/hanzi-writer-data/文.json',
        './node_modules/hanzi-writer-data/誰.json',
        './node_modules/hanzi-writer-data/家.json',
        './node_modules/hanzi-writer-data/幾.json',
        './node_modules/hanzi-writer-data/和.json',
        './node_modules/hanzi-writer-data/做.json',
        './node_modules/hanzi-writer-data/都.json',
        './node_modules/hanzi-writer-data/律.json',
        './node_modules/hanzi-writer-data/白.json',
        './node_modules/hanzi-writer-data/愛.json',
        './node_modules/hanzi-writer-data/們.json',
        './node_modules/hanzi-writer-data/很.json',
        './node_modules/hanzi-writer-data/號.json',
        './node_modules/hanzi-writer-data/天.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/年.json',
        './node_modules/hanzi-writer-data/多.json',
        './node_modules/hanzi-writer-data/歲.json',
        './node_modules/hanzi-writer-data/吃.json',
        './node_modules/hanzi-writer-data/飯.json',
        './node_modules/hanzi-writer-data/菜.json',
        './node_modules/hanzi-writer-data/點.json',
        './node_modules/hanzi-writer-data/半.json',
        './node_modules/hanzi-writer-data/見.json',
        './node_modules/hanzi-writer-data/再.json',
        './node_modules/hanzi-writer-data/少.json',
        './node_modules/hanzi-writer-data/期.json',
        './node_modules/hanzi-writer-data/黑.json',
        './node_modules/hanzi-writer-data/刻.json',
        './node_modules/hanzi-writer-data/忙.json',
        './node_modules/hanzi-writer-data/為.json',
        './node_modules/hanzi-writer-data/還.json',
        './node_modules/hanzi-writer-data/打.json',
        './node_modules/hanzi-writer-data/球.json',
        './node_modules/hanzi-writer-data/看.json',
        './node_modules/hanzi-writer-data/電.json',
        './node_modules/hanzi-writer-data/視.json',
        './node_modules/hanzi-writer-data/唱.json',
        './node_modules/hanzi-writer-data/歌.json',
        './node_modules/hanzi-writer-data/跳.json',
        './node_modules/hanzi-writer-data/舞.json',
        './node_modules/hanzi-writer-data/聽.json',
        './node_modules/hanzi-writer-data/書.json',
        './node_modules/hanzi-writer-data/對.json',
        './node_modules/hanzi-writer-data/影.json',
        './node_modules/hanzi-writer-data/去.json',
        './node_modules/hanzi-writer-data/兩.json',
        './node_modules/hanzi-writer-data/百.json',
        './node_modules/hanzi-writer-data/兩.json',
        './node_modules/hanzi-writer-data/千.json',
        './node_modules/hanzi-writer-data/小.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/什.json',
        './node_modules/hanzi-writer-data/麼.json',
        './node_modules/hanzi-writer-data/名.json',
        './node_modules/hanzi-writer-data/字.json',
        './node_modules/hanzi-writer-data/先.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/李.json',
        './node_modules/hanzi-writer-data/友.json',
        './node_modules/hanzi-writer-data/王.json',
        './node_modules/hanzi-writer-data/朋.json',
        './node_modules/hanzi-writer-data/朋.json',
        './node_modules/hanzi-writer-data/友.json',
        './node_modules/hanzi-writer-data/老.json',
        './node_modules/hanzi-writer-data/師.json',
        './node_modules/hanzi-writer-data/學.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/中.json',
        './node_modules/hanzi-writer-data/國.json',
        './node_modules/hanzi-writer-data/美.json',
        './node_modules/hanzi-writer-data/國.json',
        './node_modules/hanzi-writer-data/北.json',
        './node_modules/hanzi-writer-data/京.json',
        './node_modules/hanzi-writer-data/紐.json',
        './node_modules/hanzi-writer-data/約.json',
        './node_modules/hanzi-writer-data/照.json',
        './node_modules/hanzi-writer-data/片.json',
        './node_modules/hanzi-writer-data/爸.json',
        './node_modules/hanzi-writer-data/爸.json',
        './node_modules/hanzi-writer-data/媽.json',
        './node_modules/hanzi-writer-data/媽.json',
        './node_modules/hanzi-writer-data/哥.json',
        './node_modules/hanzi-writer-data/哥.json',
        './node_modules/hanzi-writer-data/弟.json',
        './node_modules/hanzi-writer-data/弟.json',
        './node_modules/hanzi-writer-data/男.json',
        './node_modules/hanzi-writer-data/孩.json',
        './node_modules/hanzi-writer-data/孩.json',
        './node_modules/hanzi-writer-data/子.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/大.json',
        './node_modules/hanzi-writer-data/哥.json',
        './node_modules/hanzi-writer-data/兒.json',
        './node_modules/hanzi-writer-data/子.json',
        './node_modules/hanzi-writer-data/女.json',
        './node_modules/hanzi-writer-data/兒.json',
        './node_modules/hanzi-writer-data/妹.json',
        './node_modules/hanzi-writer-data/妹.json',
        './node_modules/hanzi-writer-data/工.json',
        './node_modules/hanzi-writer-data/作.json',
        './node_modules/hanzi-writer-data/醫.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/大.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/二.json',
        './node_modules/hanzi-writer-data/姐.json',
        './node_modules/hanzi-writer-data/律.json',
        './node_modules/hanzi-writer-data/師.json',
        './node_modules/hanzi-writer-data/英.json',
        './node_modules/hanzi-writer-data/文.json',
        './node_modules/hanzi-writer-data/大.json',
        './node_modules/hanzi-writer-data/學.json',
        './node_modules/hanzi-writer-data/百.json',
        './node_modules/hanzi-writer-data/萬.json',
        './node_modules/hanzi-writer-data/九.json',
        './node_modules/hanzi-writer-data/月.json',
        './node_modules/hanzi-writer-data/十.json',
        './node_modules/hanzi-writer-data/二.json',
        './node_modules/hanzi-writer-data/星.json',
        './node_modules/hanzi-writer-data/期.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/日.json',
        './node_modules/hanzi-writer-data/今.json',
        './node_modules/hanzi-writer-data/年.json',
        './node_modules/hanzi-writer-data/十.json',
        './node_modules/hanzi-writer-data/八.json',
        './node_modules/hanzi-writer-data/謝.json',
        './node_modules/hanzi-writer-data/謝.json',
        './node_modules/hanzi-writer-data/喜.json',
        './node_modules/hanzi-writer-data/歡.json',
        './node_modules/hanzi-writer-data/還.json',
        './node_modules/hanzi-writer-data/是.json',
        './node_modules/hanzi-writer-data/可.json',
        './node_modules/hanzi-writer-data/是.json',
        './node_modules/hanzi-writer-data/我.json',
        './node_modules/hanzi-writer-data/們.json',
        './node_modules/hanzi-writer-data/晚.json',
        './node_modules/hanzi-writer-data/上.json',
        './node_modules/hanzi-writer-data/再.json',
        './node_modules/hanzi-writer-data/見.json',
        './node_modules/hanzi-writer-data/英.json',
        './node_modules/hanzi-writer-data/國.json',
        './node_modules/hanzi-writer-data/今.json',
        './node_modules/hanzi-writer-data/天.json',
        './node_modules/hanzi-writer-data/吃.json',
        './node_modules/hanzi-writer-data/飯.json',
        './node_modules/hanzi-writer-data/怎.json',
        './node_modules/hanzi-writer-data/樣.json',
        './node_modules/hanzi-writer-data/現.json',
        './node_modules/hanzi-writer-data/在.json',
        './node_modules/hanzi-writer-data/事.json',
        './node_modules/hanzi-writer-data/兒.json',
        './node_modules/hanzi-writer-data/明.json',
        './node_modules/hanzi-writer-data/天.json',
        './node_modules/hanzi-writer-data/晚.json',
        './node_modules/hanzi-writer-data/飯.json',
        './node_modules/hanzi-writer-data/因.json',
        './node_modules/hanzi-writer-data/為.json',
        './node_modules/hanzi-writer-data/同.json',
        './node_modules/hanzi-writer-data/學.json',
        './node_modules/hanzi-writer-data/認.json',
        './node_modules/hanzi-writer-data/識.json',
        './node_modules/hanzi-writer-data/週.json',
        './node_modules/hanzi-writer-data/末.json',
        './node_modules/hanzi-writer-data/打.json',
        './node_modules/hanzi-writer-data/球.json',
        './node_modules/hanzi-writer-data/電.json',
        './node_modules/hanzi-writer-data/視.json',
        './node_modules/hanzi-writer-data/唱.json',
        './node_modules/hanzi-writer-data/歌.json',
        './node_modules/hanzi-writer-data/跳.json',
        './node_modules/hanzi-writer-data/舞.json',
        './node_modules/hanzi-writer-data/音.json',
        './node_modules/hanzi-writer-data/樂.json',
        './node_modules/hanzi-writer-data/有.json',
        './node_modules/hanzi-writer-data/的.json',
        './node_modules/hanzi-writer-data/時.json',
        './node_modules/hanzi-writer-data/候.json',
        './node_modules/hanzi-writer-data/電.json',
        './node_modules/hanzi-writer-data/影.json',
        './node_modules/hanzi-writer-data/常.json',
        './node_modules/hanzi-writer-data/常.json',
        './node_modules/hanzi-writer-data/外.json',
        './node_modules/hanzi-writer-data/國.json',
        './node_modules/hanzi-writer-data/請.json',
        './node_modules/hanzi-writer-data/客.json',
        './node_modules/hanzi-writer-data/昨.json',
        './node_modules/hanzi-writer-data/天.json',
        './node_modules/hanzi-writer-data/所.json',
        './node_modules/hanzi-writer-data/以.json',
        './node_modules/hanzi-writer-data/為.json',
        './node_modules/hanzi-writer-data/什.json',
        './node_modules/hanzi-writer-data/麼.json',
        './node_modules/hanzi-writer-data/高.json',
        './node_modules/hanzi-writer-data/文.json',
        './node_modules/hanzi-writer-data/中.json',
        './node_modules/hanzi-writer-data/白.json',
        './node_modules/hanzi-writer-data/英.json',
        './node_modules/hanzi-writer-data/愛.json',
        './node_modules/hanzi-writer-data/大.json',
        './node_modules/hanzi-writer-data/學.json',
        './node_modules/hanzi-writer-data/生.json',
        './node_modules/hanzi-writer-data/星.json',
        './node_modules/hanzi-writer-data/期.json',
        './node_modules/hanzi-writer-data/四.json',
        './node_modules/hanzi-writer-data/怎.json',
        './node_modules/hanzi-writer-data/麼.json',
        './node_modules/hanzi-writer-data/樣.json',
        './node_modules/hanzi-writer-data/太.json',
        './node_modules/hanzi-writer-data/了.json'
    ];

    var unique = new Set(characters);

    console.log('unique',unique);

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

    gulp.src(characters)
        .pipe(gulp.dest(paths.json.src + '/chars'));
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
