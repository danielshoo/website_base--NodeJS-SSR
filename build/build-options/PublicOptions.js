const path = require("node:path");
const process = require("node:process");
const publicSassBuilder = require("../plugins/sass/public-sass-builder");
const fs = require("node:fs");

const isProductionMode = process.argv.includes('--prod');
const assetsDir = path.resolve(__dirname, '..', '..', 'assets');
const publicDir = path.resolve(__dirname, '..', '..', 'public');

const recursiveFindEntries = function (rootDir) {

    const entries = [];

    function _recursiveFindEntries(dir) {
        fs.readdirSync(dir).forEach(dirItem => {
            const dirItemPath = path.resolve(dir, dirItem);
            const dirItemPathStat = fs.statSync(dirItemPath);
            if (dirItemPathStat.isFile() && ['.scss', '.ts', '.tsx'].includes(path.parse(dirItemPath).ext)) {
                entries.push(dirItemPath);
            } else if (dirItemPathStat.isDirectory() && dirItemPathStat.name !== 'lib') {
                _recursiveFindEntries(dirItemPath);
            }
        });
    }

    _recursiveFindEntries(rootDir);

    return entries;
}

const publicEntries = recursiveFindEntries(publicDir);

module.exports = {
    target: 'es2020',
    platform: 'browser',
    entryPoints: publicEntries,
    assetNames: '[dir]/[name].js',
    sourcemap: !isProductionMode,
    tsconfig: path.resolve(__dirname, '..', '..', 'tsconfig.json'),
    minify: isProductionMode,
    plugins: [publicSassBuilder()],
    outbase: 'public',
    bundle: true,
    outdir: 'assets',
};
