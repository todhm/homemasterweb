'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
// import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';

gulp.task('default', ['clean', 'js', 'css'], () => {
	return gutil.log('Gulp is running');
});

/* Definition of directories */

const DIR = {
	DEST: 'dist'
};

const SRC = {
	JS: 'js/*.js',
	CSS: 'css/*.css',
	HTML: '*.html',
	IMAGES: ['img/*', 'img/**/*']
};

const DEST = {
	JS: DIR.DEST + '/js',
	CSS: DIR.DEST + '/css',
	HTML: DIR.DEST + '/',
	IMAGES: DIR.DEST + '/img'
};

/* minify javascript */
gulp.task('js', () => {
	return gulp.src(SRC.JS)
			.pipe(uglify())
			.pipe(gulp.dest(DEST.JS));
});

/* minify CSS */
gulp.task('css', () => {
	return gulp.src(SRC.CSS)
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest(DEST.CSS));
});

/* minify html */
// gulp.task('html', () => {
// 	return gulp.src(SRC.HTML)
// 			.pipe(htmlmin({collapseWhitespace: true}))
// 			.pipe(gulp.dest(DEST.HTML));
// });

/* compress images */
gulp.task('images', () => {
	return gulp.src(SRC.IMAGES)
			.pipe(imagemin())
			.pipe(gulp.dest(DEST.IMAGES));
});

/* CLEAN - Delect all files in 'dist' folder*/
gulp.task('clean', () => {
	return del.sync([DIR.DEST]);
});

/* 
watch는 특정 디렉토리 및 파일들을 감시하고 있다가 변동이 감지 될 시, 
지정한 task 를 실행시키는 기능
어떤 파일이 변경되었는지 기록 
*/

/*gulp.task('watch', () => {
    let watcher = {
        js: gulp.watch(SRC.JS, ['js']),
        css: gulp.watch(SRC.CSS, ['css']),
        html: gulp.watch(SRC.HTML, ['html']),
        images: gulp.watch(SRC.IMAGES, ['images'])
    };
 
    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };
 
    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});*/
