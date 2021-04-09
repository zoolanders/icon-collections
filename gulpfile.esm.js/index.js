import {series} from 'gulp';
import globby from 'globby';
import {resolve} from 'path';
import preflight from './tasks/preflight';
import buildCollection from './tasks/build-collection';

// const collections = globby.sync('collections/*');
const collections = globby.sync('collections/*', {onlyDirectories: true});

export const build = series(
    preflight,
    ...collections.map(c => buildCollection(resolve(process.cwd(), c)))
);

export default build;
