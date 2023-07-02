const process = require('node:process');
const esbuild = require('esbuild');

const esPublicBuildOptions = require('./build-options/PublicOptions');
const esSrcBuildOptions = require('./build-options/SrcOptions');

const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {

    (async () => {

        const esCtxPublic = await esbuild.context(esPublicBuildOptions);
        await esCtxPublic.watch().then(() => { console.log('Watching for public changes...');});

        const esCtxSrc = await esbuild.context(esSrcBuildOptions);
        await esCtxSrc.watch().then(() => { console.log('Watching for src changes...'); });

    })();
} else {

    esbuild.build(esSrcBuildOptions).catch((e) => {
        console.error(e);
        process.exit(1)
    });

    esbuild.build(esPublicBuildOptions).catch((e) => {
        console.error(e);
        process.exit(1)
    });
}
