var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
//var path = require('path');
//var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function () {

    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        //.pipe($.minifyHtml({empty: true}))
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'templatecache'], function () {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.theme)))
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});


gulp.task('optimize', ['inject', 'images', 'fonts'], function() {
   log('Optimizing the javascript, css, html');

    var assets = $.useref({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter(['**/*.css'],{restore:true});
    var jsFilter = $.filter(['**/*.js'],{restore:true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(
            gulp.src(templateCache, {read: false}), {
                starttag: '<!-- inject:templates:js -->'
            }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.build));
});

gulp.task('build', ['optimize', 'images', 'fonts'], function() {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    };
    del(config.temp);
    log(msg);
    //notify(msg);
});


gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    return del(delconfig).then(log('delete done'));
});

gulp.task('clean-fonts', function(done) {
    return clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function(done) {
    return clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function(done) {
    return clean(config.temp + '**/*.css');
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    return clean(files);
});




gulp.task('fonts', ['clean-fonts'], function() {

    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});


gulp.task('images', ['clean-images'], function() {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});


gulp.task('serve-build', ['optimize'], function () {
    serve(false /* isDev */);
});


gulp.task('serve-dev', ['inject'], function () {
    serve(true /* isDev */);
});

/////////////////////  MY FUNCTIONS /////////////////////////////
function clean(path) {

    log('Cleaning: ' + $.util.colors.blue(path));

    return del(path).then(log('delete done'));

}


function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}


function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    // if (isDev) {
    //      gulp.watch([config.less], ['styles'])
    //          .on('change', changeEvent);
    // } else {
    //      gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
    //          .on('change', changeEvent);
    // }

    if (!isDev) {
        gulp.watch([config.js, config.html], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ] : [],
        //files: [config.client + '**/*.*'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'brewmanager',
        notify: true,
        reloadDelay: 1000 //1000
    };

    // if (specRunner) {
    //     options.startPath = config.specRunnerFile;
    // }

    browserSync(options);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
