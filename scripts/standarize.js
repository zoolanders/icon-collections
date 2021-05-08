const fs = require('fs');
const globby = require('globby');
const SVGO = require('svgo');

/**
 * Standarize icons for UIkit Icons compatibility
 **/

(async () => {

    const collections = await globby('collections/**/*.svg');

    const svgo = new SVGO({
        plugins: [
            {removeDimensions: true},
            {convertStyleToAttrs: true},
            {
                removeAttrs: {
                    attrs: 'class'
                }
            },
            {
                addAttributesToSVGElement: {
                    attribute: {'width': 20, 'height': 20}
                }
            }
        ]
    });

    for (const path of collections) {

        const data = fs.readFileSync(path, 'utf8');
        const result = await svgo.optimize(data, {path});

        fs.writeFileSync(path, result.data);
    }

})();
