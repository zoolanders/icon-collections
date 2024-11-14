import fs from 'fs';
import gulp from 'gulp';
import zip from 'gulp-zip';
import { basename } from 'path';
import rename from 'gulp-rename';
import config from '../config.js';

const { dest, src } = gulp;

export default (collection) => {
    const name = basename(collection);
    const manifest = JSON.parse(fs.readFileSync(`${collection}.json`, 'utf8'));

    const fn = function __zip() {
        return (
            src([`${collection}/**/*`, `${collection}.json`])
                // wrap icons in folder
                .pipe(
                    rename((path) => {
                        if (path.extname === '' || path.extname === '.svg') {
                            path.dirname = `${name}/${path.dirname}`;
                        }
                    })
                )
                .pipe(zip(`${name}_${manifest.version}.zip`))
                .pipe(dest(config.dest))
        );
    };

    fn.displayName = name;

    return fn;
};
