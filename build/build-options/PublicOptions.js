const path = require("node:path");
const process = require("node:process");
const publicSassBuilder = require("../plugins/sass/public-sass-builder");

const isProductionMode = process.argv.includes('--prod');
const publicMainFile = path.resolve(__dirname, '..', '..', 'public', 'react-pages', 'main.ts');

module.exports = {
    platform: 'browser',
    entryPoints: [publicMainFile],
    target: 'es2020',
    outdir: path.dirname(publicMainFile),
    sourcemap: !isProductionMode,
    tsconfig: path.resolve(__dirname, '..', '..', 'tsconfig.json'),
    bundle: true,
    minify: isProductionMode,
    plugins: [publicSassBuilder()],
};
