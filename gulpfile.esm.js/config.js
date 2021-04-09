import {resolve} from 'path';

const dest = resolve(process.cwd(), 'dist');
const build = resolve(process.cwd(), 'dist/build');

export default {dest, build};
