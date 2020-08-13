'use strict';
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
//----------------------------------------------------------------------------------------------------------------------
let projects = ['organic'];

projects.forEach(function (item) {
    gulp.task(item, function () {
        return gulp.src('./sass/all.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css/'))
            .on('end', function () {
                //filesWrite(item);
                console.log(item + ' done');
            })
    });
    gulp.watch('./sass/**/*.scss', gulp.series(item));
});

gulp.task('default', gulp.parallel(projects));

//----------------------------------------------------------------------------------------------------------------------
function filesWrite(project) {
    fs.readdir('./', function (err, items) {
        let date = Date.now();

        for (let i = 0; i < items.length; i++) {
            if (items[i].substr(-5) === '.html') {
                let path = './' + items[i];
                let contents = fs.readFileSync(path).toString();
                let start, end, left, right;

                end = 0;
                while (contents.indexOf('?ver=', end) !== -1) {
                    start = contents.indexOf('?ver=', end) + 5;
                    end = contents.indexOf('"', start);
                    left = contents.slice(0, start);
                    right = contents.slice(end);
                    contents = left + date + right;
                }

                fs.writeFile(path, contents, function (err) {
                    if (err) throw err;
                });
            }
        }

        console.log(project + ' ' + date);
    });
}