import gulp from 'gulp';
import globby from 'globby';
import { resolve } from 'path';
import preflight from './tasks/preflight.js';
import buildCollection from './tasks/build-collection.js';

const { series } = gulp;

// const collections = globby.sync('collections/*');
const collections = globby.sync('collections/*', { onlyDirectories: true });

export const build = series(
    preflight,
    ...collections.map((c) => buildCollection(resolve(process.cwd(), c)))
);

export default build;
