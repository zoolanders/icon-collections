import del from 'del';
import gulp from 'gulp';

const { parallel } = gulp;

import config from '../config.js';

export default parallel(function __cleanup() {
    return del(`${config.dest}/*`);
});
