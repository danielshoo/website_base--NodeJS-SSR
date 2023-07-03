const path = require("node:path");
const process = require("node:process");
const frontendSassBuilder = require("../plugins/sass/frontend-sass-builder");
const fs = require("node:fs");
const projectDir = path.resolve(__dirname, '..', '..');

const isProductionMode = process.argv.includes('--prod');
const frontendDir = path.resolve(__dirname, '..', '..', 'frontend');

const recursiveFindEntries = function (rootDir) {

    const entries = [];

    function _recursiveFindEntries(dir) {
        fs.readdirSync(dir).forEach(dirItem => {
            const dirItemPath = path.resolve(dir, dirItem);
            const dirItemPathStat = fs.statSync(dirItemPath);
            const dirItemPathParts = path.parse(dirItemPath);
            if (dirItemPathStat.isFile() && ['.scss', '.ts', '.tsx'].includes(path.parse(dirItemPath).ext)) {
                entries.push(dirItemPath);
            } else if (dirItemPathStat.isDirectory() && dirItemPathParts.name !== 'lib') {
                _recursiveFindEntries(dirItemPath);
            }
        });
    }

    _recursiveFindEntries(rootDir);

    return entries;
}

const frontendEntries = recursiveFindEntries(frontendDir);

module.exports = {
    target: 'es2020',
    platform: 'browser',
    entryPoints: frontendEntries,
    assetNames: '[dir]/[name].js',
    sourcemap: !isProductionMode,
    nodePaths: [projectDir],
    absWorkingDir: projectDir,
    tsconfig: path.resolve(__dirname, '..', '..', 'tsconfig.json'),
    minify: isProductionMode,
    plugins: [frontendSassBuilder()],
    outbase: 'frontend',
    bundle: true,
    outdir: 'assets',
};
