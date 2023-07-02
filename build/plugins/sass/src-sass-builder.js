const path = require("node:path");
const sass = require("sass");
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
        name: 'src_sass_to_css',
        setup: function (build) {

            build.onResolve({filter: /.scss$/}, args => {

                const scssFullPath = require.resolve(args.path, {
                    paths: [args.resolveDir],
                });

                const scssCompiled = sass.compile(scssFullPath, {loadPaths: [dirProjectRoot, dirSrc, dirPublic]});
                const watchFiles = scssCompiled.loadedUrls.filter((urlObj) => urlObj.protocol === 'file:').map(url.fileURLToPath);

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
