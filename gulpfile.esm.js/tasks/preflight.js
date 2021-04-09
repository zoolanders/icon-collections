import del from 'del';
import {parallel} from 'gulp';

import config from '../config';

export default parallel(

    function __cleanup() {
        return del(`${config.dest}/*`);
    }

);
