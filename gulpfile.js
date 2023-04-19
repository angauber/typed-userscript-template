const { dest } = require('gulp');
const source = require('vinyl-source-stream');
const header = require('gulp-header');
const browserify = require('browserify');
const buffer = require("vinyl-buffer");
const babelify = require('babelify');
const tsify = require("tsify");
const fs = require("fs");
const minify = require('gulp-minify');

function compileTask() {
    return (
        browserify({
            basedir: ".",
            entries: ['src/main.ts'],
            cache: {},
            packageCache: {},
        })
        .plugin(tsify)
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            global: true,
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(minify())
        .pipe(header(fs.readFileSync('header.txt', 'utf-8')))
        .pipe(dest('dist'))
    );
}

exports.default = compileTask;