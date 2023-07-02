const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");
const srcSassBuilder = require("../plugins/sass/src-sass-builder");

const isProductionMode = process.argv.includes('--prod');
const publicDir = path.resolve(__dirname, '..', '..', 'public');

const recursiveFindEntries = function (rootDir) {

    const entries = [];

    fs.readdirSync(rootDir).forEach(dirItem => {
        const dirItemPath = path.resolve(rootDir, dirItem);
        const dirItemPathStat = fs.statSync(dirItemPath);
        if (dirItemPathStat.isFile() && ['scss', 'ts', 'tsx'].includes(path.parse(dirItemPath).ext)) {
            entries.push(dirItemPath.replace(publicDir, ''));
        } else if (dirItemPathStat.isDirectory() && dirItemPathStat.name !== 'lib') {
            recursiveFindEntries(dirItemPath);
        }
    });

    return entries;
}

const publicEntries = recursiveFindEntries(publicDir);

module.exports = {
    platform: 'node',
    entryPoints: publicEntries,
    outdir: publicDir,
    sourcemap: true,
    tsconfig: path.resolve(__dirname, '..', '..', 'tsconfig.json'),
    bundle: true,
    minify: isProductionMode,
    plugins: [srcSassBuilder()],
};
