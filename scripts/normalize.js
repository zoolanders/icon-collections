import fs from 'fs';
import globby from 'globby';
import SVGO from 'svgo';

/**
 * Normalize icons for UIkit Icons compatibility
 **/

(async () => {
    const icons = await globby('collections/**/*.svg');

    const svgo = new SVGO({
        plugins: [
            { removeDimensions: true },
            { convertStyleToAttrs: true },
            {
                removeAttrs: {
                    attrs: 'class',
                },
            },
            {
                addAttributesToSVGElement: {
                    attribute: { width: 20, height: 20 },
                },
            },
        ],
    });

    for (const path of icons) {
        let data = fs.readFileSync(path, 'utf8');

        // normalize comments (looking at you fontawesome...)
        data = data.replace('<!--!', '<!--');

        const result = await svgo.optimize(data, { path });

        fs.writeFileSync(path, result.data);
    }
})();
