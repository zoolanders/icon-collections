const fs = require('fs');
const {resolve} = require('path');
const globby = require('globby');

/**
 * Count total icons
 **/

(async () => {

    const collections = await globby('collections/*.json');

    for (const collection of collections) {

        const manifest = require(resolve(process.cwd(), collection));
        const icons = globby.sync(`collections/${manifest.name}/**/*.svg`);

        manifest.total = icons.length;

        fs.writeFileSync(collection, JSON.stringify(manifest, null, 4));
    }

})();
