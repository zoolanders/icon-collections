import path from 'path';
import vinylMap from 'vinyl-map2';
import CleanCSS from 'clean-css';
import UglifyJS from 'uglify-js';
import { format as formatDate } from 'date-fns';

export const minifyCss = (options = {}) =>
    vinylMap(function (buff, filename) {
        return new CleanCSS(options).minify(buff.toString()).styles;
    });

export const minifyJs = (options = {}) =>
    vinylMap(function (buff, filename) {
        return UglifyJS.minify(buff.toString()).code;
    });

export function exec(cmd, opts = {}) {
    const { spawn } = require('child_process');

    return new Promise((resolve, reject) => {
        const child = spawn(cmd, { ...opts, shell: true });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);

        child.on('close', () => resolve());
    });
}

/**
 * Tag files with copyright information
 */
export const tagFiles = (metadata) =>
    vinylMap(function (buff, filename) {
        const ext = path.extname(filename);
        const content = buff.toString();
        const { title, version, author, authorUrl, copyright, license } = metadata;

        if (ext === '.css' || ext === '.js') {
            const tag = `/* ${title} ${version}; ${copyright}; ${license} */\n\n`;

            return tag + content;
        }

        if (ext === '.php') {
            const tag = [];

            tag.push('<?php');
            tag.push('/**');
            tag.push(` * @package   ${title} ${version}`);
            tag.push(` * @author    ${author} ${authorUrl}`);
            tag.push(` * @copyright ${copyright}`);

            if (license) {
                tag.push(` * @license   ${license}`);
            }

            tag.push(' */');

            return content.replace(/^(<\?php)\s?\n/g, tag.join('\n') + '\n\n');
        }

        return content;
    });

/**
 * Replace files static variables
 */
export const replaceVars = (metadata) =>
    vinylMap(function (buff, filename) {
        return buff
            .toString()
            .replace(/{{ TITLE }}/g, metadata.title)
            .replace(/{{ HOMEPAGE }}/g, metadata.homepage)
            .replace(/{{ VERSION }}/g, metadata.version)
            .replace(/{{ DESCRIPTION }}/g, metadata.description)
            .replace(/{{ DATE }}/g, formatDate(new Date(), 'MMMM yyyy'))
            .replace(/{{ COPYRIGHT }}/g, metadata.copyright)
            .replace(/{{ LICENSE }}/g, metadata.license)
            .replace(/{{ AUTHOR }}/g, metadata.author)
            .replace(/{{ AUTHORURL }}/g, metadata.authorUrl)
            .replace(/{{ LEVEL }}/g, metadata.release)
            .replace(/{{ MIN_PHP_VERSION }}/g, metadata.minPHP)
            .replace(/{{ MIN_YTP_VERSION }}/g, metadata.minYTP)
            .replace(/{{ MIN_JOOMLA_VERSION }}/g, metadata.minJoomla)
            .replace(/{{ MIN_WORDPRESS_VERSION }}/g, metadata.minWordPress)
            .replace(/'{{ DEBUG }}'/g, '0');
    });
