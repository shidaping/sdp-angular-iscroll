var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minify_css=require('gulp-minify-css');


gulp.task('jshint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('uglify',function(){
    return gulp.src("src/js/**/*.js")
        .pipe(concat('sdp_angular_iscroll.js'))
        .pipe(uglify())
        .pipe(rename('sdp_angular_iscroll.min.js'))
        .pipe(gulp.dest("dist/js/"))
})
gulp.task('sass',function(){
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(minify_css())
        .pipe(rename('sdp_angular_iscroll.min.css'))
        .pipe(gulp.dest("dist/css"))
})
gulp.task('watch', function () {
    gulp.watch('src/**/*.*', ['jshint', 'uglify','sass']);
});

gulp.task('prepare',['jshint','uglify','sass']);
gulp.task('default', ['jshint', 'uglify','sass','watch']);