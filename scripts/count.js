import fs from 'fs';
import { resolve } from 'path';
import globby from 'globby';

/**
 * Count total icons
 **/

(async () => {
    const collections = await globby('collections/*/*.json');

    for (const collection of collections) {
        const manifest = JSON.parse(fs.readFileSync(resolve(process.cwd(), collection), 'utf8'));
        const icons = globby.sync(`collections/${manifest.name}/**/*.svg`);

        manifest.icons = icons.length;

        fs.writeFileSync(collection, JSON.stringify(manifest, null, 4));
    }
})();
