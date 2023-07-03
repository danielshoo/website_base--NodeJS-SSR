const path = require("node:path");
const process = require("node:process");
const srcSassBuilder = require("../plugins/sass/src-sass-builder");
const projectDir = path.resolve(__dirname, '..', '..');


const isProductionMode = process.argv.includes('--prod');
const mainFile = path.resolve(__dirname, '..', '..', 'main.ts');

module.exports = {
    platform: 'node',
    entryPoints: [mainFile],
    outdir: path.dirname(mainFile),
    nodePaths: [projectDir],
    absWorkingDir: projectDir,
    sourcemap: true,
    tsconfig: path.resolve(__dirname, '..', '..', 'tsconfig.json'),
    bundle: true,
    minify: isProductionMode,
    plugins: [srcSassBuilder()],
};
