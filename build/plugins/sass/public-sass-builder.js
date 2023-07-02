const path = require("node:path");
const sass = require("sass");
const fs = require("node:fs");
const url = require("url");

const dirProjectRoot = path.resolve(__dirname, '..', '..', '..');
const dirSrc = path.resolve(dirProjectRoot, 'src');
const dirPublic = path.resolve(dirProjectRoot, 'public');

/**
 * Enables the frontend (public / static) codebase to resolve SCSS from the src (backend) codebase. By crossing
 * that gap, we can treat the frontend & backend codebases as on homogeneous structure. Towards that end, this plugin
 * generates an output file for each entrypoint that requires SCSS. It also resolves the required module with
 * the CSS string.
 */
module.exports = () => {

    return {
        name: 'public_sass_to_css',
        setup: function (build) {

            let resets = [];

            build.onStart(() => {
                resets = [];
            })

            build.onResolve({filter: /.scss$/}, args => {

                const scssFullPath = require.resolve(args.path, {
                    paths: [args.resolveDir],
                });

                const publicFullPath = require.resolve(args.importer, {
                    paths: [args.resolveDir],
                });

                const parts = path.parse(publicFullPath);
                const scssCompiled = sass.compile(scssFullPath, {loadPaths: [dirProjectRoot, dirSrc, dirPublic]});
                const watchFiles = scssCompiled.loadedUrls.filter((urlObj) => urlObj.protocol === 'file:').map(url.fileURLToPath);
                const outputPath = path.resolve(path.dirname(publicFullPath) + path.sep + parts.name + '.css');
                const isEntryPoint = build.initialOptions.entryPoints.includes(publicFullPath);

                if (isEntryPoint) {
                    if (!resets.includes(outputPath)) {
                        resets.push(outputPath);
                        fs.writeFileSync(outputPath, scssCompiled.css, {encoding: 'utf-8', flag: 'w'});
                    } else {
                        fs.writeFileSync(outputPath, scssCompiled.css, {encoding: 'utf-8', flag: 'a'});
                    }
                }

                return {
                    watchFiles,
                    path: scssFullPath,
                    namespace: 'file',
                };
            });

            build.onLoad({filter: /.scss$/, namespace: 'file'}, (args) => {

                const scssDir = path.dirname(args.path);
                const scssFileContents = sass.compile(args.path, {loadPaths: [scssDir, dirProjectRoot]});

                return {
                    contents: `module.exports = ${JSON.stringify(scssFileContents.css)}`
                };
            });
        }
    }
};
