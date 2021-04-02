const fs = require('fs')
const esbuild = require('esbuild')
const path = require('path')
const {
    NodeModulesPolyfillPlugin,
    NodeGlobalsPolyfillPlugin,
    NodeResolvePlugin,
} = require('@esbuild-plugins/all')

const plugins = [
    // NodeResolvePlugin({ extensions: ['.js'] }),
    NodeModulesPolyfillPlugin(),
    NodeGlobalsPolyfillPlugin({ buffer: true }),
]

async function main() {
    fs.rmSync(path.resolve(__dirname, 'out'), { force: true, recursive: true })
    const res = await esbuild.build({
        entryPoints: [
            path.resolve('node_modules/cesium/Source/Cesium.js'),
            path.resolve('node_modules/cesium2/Source/Cesium.js'),
            require.resolve('safe-buffer'),
            'another.js',
            'another_one.js',
        ],
        format: 'esm',
        logLevel: 'error',
        write: true,
        // keepNames: true,
        plugins,
        minify: false,
        target: 'es2020',
        minifyIdentifiers: true,
        minifySyntax: false,
        // inject: [path.resolve(__dirname, 'buffer.js')],
        minifyWhitespace: false,
        splitting: true,
        bundle: true,

        outdir: 'out',
        // outfile: 'out.js',
    })
    await esbuild.build({
        plugins,
        logLevel: 'error',
        entryPoints: ['out/node_modules/cesium/Source/Cesium.js'],
        bundle: true,
        format: 'esm',
        write: false,
    })
}

main()
