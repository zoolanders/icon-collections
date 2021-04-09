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
            .pipe(rename(path => {
                if (path.basename !== name) {
                    path.dirname = `${name}/${path.dirname}`;
                }
            }))
            .pipe(zip(`${name}_${manifest.meta.version}.zip`))
            .pipe(dest(config.dest));
    }

    fn.displayName = name;

    return fn;

};