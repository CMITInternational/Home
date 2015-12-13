/**
 * Created by Darcy on 19/06/2015.
 */
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var babel = require('gulp-babel');
var publish = require('gulp-publish');
var jasmine = require('gulp-jasmine');
var jasmine_spec_reporter = require('jasmine-spec-reporter');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('compile', function(){
    gulp.src(['./src/**/*.ts'])
        .pipe(typescript(tsProject))
        .pipe(babel({
            presets: [
                'es2015',
                'stage-0',
                'stage-1',
                'stage-2',
                'stage-3',
                'react'
            ]
        }))
        .pipe(gulp.dest('build/'))
});

gulp.task('publish', function () {
    gulp.src(['./src/**/*.html'])
        .pipe(publish())
        .pipe(gulp.dest('build/'));
});

gulp.task('test', ['compile','publish'], function() {
    gulp.src(['./build/**/*.spec.js'])
        .pipe(jasmine({
            verbose: true
        }))
});