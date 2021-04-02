const fs = require('fs')
const esbuild = require('esbuild')
const path = require('path')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/all')

const plugins = [
    // NodeResolvePlugin({ extensions: ['.js'] }),
    NodeModulesPolyfillPlugin(),
    // NodeGlobalsPolyfillPlugin({ buffer: true }),
]

async function main() {
    fs.rmSync(path.resolve(__dirname, 'out'), { force: true, recursive: true })
    const res = await esbuild.build({
        entryPoints: [
            path.resolve('node_modules/cesium/Source/Cesium.js'),
            'another.js',
        ],
        format: 'esm',
        logLevel: 'error',
        plugins,
        minify: false,
        target: 'es2020',
        minifyIdentifiers: true,
        splitting: true,
        bundle: true,

        outdir: 'out',
    })
    // check errors
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
