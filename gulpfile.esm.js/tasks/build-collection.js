import zip from 'gulp-zip';
import {basename} from 'path';
import rename from 'gulp-rename';
import {src, dest, series} from 'gulp';

import config from '../config';

export default collection => {

    const name = basename(collection);
    const manifest = require(`${collection}.json`);

    const fn = function __zip() {
        return src([
            `${collection}/**/*`,
            `${collection}.json`,
        ])
            // wrap icons in folder
            .pipe(rename(path => {
                if (path.extname === '' || path.extname === '.svg') {
                    path.dirname = `${name}/${path.dirname}`;
                }
            }))
            .pipe(zip(`${name}_${manifest.meta.version}.zip`))
            .pipe(dest(config.dest));
    }

    fn.displayName = name;

    return fn;

};