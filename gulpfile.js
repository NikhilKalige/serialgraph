'use strict';

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var _ = require('underscore');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    "bootstrap": "./client/bower_components/bootstrap/less",
    "fontawesome": "./client/bower_components/font-awesome/less",
    "material": "./client/bower_components/bootstrap-material-design/less",
    "widgets": "./node_modules/react-widgets/lib/less",
    "react_select": "node_modules/react-select/less",
    "less": "./client/styles/main.less",
    "img_src": "./client/images/**/*",
    "img_dst": "./public/img",
    "css": "./public/css",
    "js": "./public/js",
    "js_file": './client/scripts/app.js',
    "modernizr": "./client/bower_components/modernizr/modernizr.js",
    "jquery": "./client/bower_components/jquery/dist/jquery.min.js"
}

var deps = [
    "react",
    "react-bootstrap",
    "marty",
    "shortid",
    "immutable",
    "reflux",
    "classnames",
    "marty-socket.io-state-source",
    "react-chartjs"
];

var less_error = function(err) {
    console.log('[LESS] ' + err.message);
    this.emit('end');
};

var browserify_error = function(error) {
    $.util.log($.util.colors.red(error));
};

gulp.task('styles', function() {
    return gulp.src(paths.less)
        .pipe(plumber({
            errorHandler: less_error
        }))
        .pipe(less({
            paths: [paths.bootstrap, paths.fontawesome, paths.material, paths.react_select],
            //verbose: true
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(paths.css))
        .pipe($.size());
});

var scripts = function(options) {
    var settings = _.extend({
        name: "",
        source: "",
        watching: false,
        deps: [],
        require: []
    }, options);

    var bundler = browserify(settings.source, {
        debug: true,
        extensions: [".js", ".hbs", ".jsx"]
    });

    bundler.transform(reactify);

    if(settings.watching)
        bundler = watchify(bundler);

    if(settings.deps.length > 0)
        bundler.external(deps);

    if(settings.require.length > 0)
        bundler.require(deps);

    var rebundle = function() {
        return bundler.bundle()
            .on("error", browserify_error)
            .pipe(source(settings.name))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.js));
    };

    bundler.on("update", rebundle);
    bundler.on("log", function(msg) {
        $.util.log($.util.colors.green(msg))
    });
    return rebundle();
};


gulp.task("scripts-vendors", function() {
    return scripts({
        name: "vendors.js",
        require: deps
    });
});

gulp.task("scripts-client", function() {
    return scripts({
        name: "app.js",
        source: paths.js_file,
        watching: true,
        deps: deps
    });
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src(paths.img_src)
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.img_dst))
        .pipe($.size());
});

// Clean
gulp.task('clean', function (cb) {
    cb(del.sync([paths.css, paths.js, paths.img_dst]));
});

// Bundle
gulp.task('bundle', ['styles', 'scripts-client', 'scripts-vendors', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

gulp.task('buildBundle', ['styles', 'buildScripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src(paths.modernizr)
        .pipe(gulp.dest(paths.js));
    gulp.src(paths.jquery)
        .pipe(gulp.dest(paths.js));
});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
    return gulp.src(['app/*.txt', 'app/*.ico'])
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});

// Watch
gulp.task('watch', ['html', 'styles', 'scripts-client', 'scripts-vendors', 'bower'], function () {
    gulp.watch(['client/scripts/**/*.js', 'client/scripts/**/*.jsx'], ['scripts-client', reload]);
    gulp.watch('client/scripts/**/*.json', ['json']);
    gulp.watch('client/*.html', ['html']);
    gulp.watch(['client/styles/**/*.less', 'client/styles/**/*.css'], ['styles', reload]);
    gulp.watch('client/images/**/*', reload);
});

gulp.task('client', ['watch'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        server: ['public', 'client']
    });
});

gulp.task('server', ['watch'], function() {
    nodemon({
        script: 'index.js',
        ext: 'js coffee handlebars'
    });
});

// Build
gulp.task('build', ['html', 'buildBundle', 'images', 'extras'], function() {
    gulp.src('dist/scripts/app.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('dist/scripts'));
});

// Default task
gulp.task('default', ['clean', 'build', 'jest' ]);
