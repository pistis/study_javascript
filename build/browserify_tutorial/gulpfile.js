'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var runSequence = require('run-sequence');

var notifier = require('node-notifier');
var source = require('vinyl-source-stream');

var src = 'public/src';
var dist = 'public/dist';
var paths = {
	js : src + '/js/*.js',
	scss : src + '/scss/*.scss',
	html : src + '/**/*.html'
};

function notify(message) {
    var _message;
    if (Array.isArray(message))
        _message = message.join('\n');
    else
        _message = message + '';
    notifier.notify({
        title: 'browserify_tutorial',
        message: _message,
        sound: true,
        wait: false
    });
}

function handleError(err) {
	notify(["ERROR", err]);
	console.log(err);
	this.emit('end');
}


gulp.task('build_2', function(){
	notify("빌드 시작");
	gulp.src('public/src/js/*.js')
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(concat('scirpt.js'))
	.pipe(gulp.dest('public/dist/js'))
});

gulp.task('browserify', function() {
	return browserify(src + '/js/entry_point.js')
			.bundle().on('error', handleError)
			.pipe(source('entry_point.js'))
			.pipe(gulp.dest(dist + '/js'));
});
gulp.task('default', function(){
	notify("START BUILD");
	runSequence('browserify');
});





