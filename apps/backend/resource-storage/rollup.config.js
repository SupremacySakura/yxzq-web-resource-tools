const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

module.exports = {
    input: 'app.js',
    output:{
        file: 'dist/app.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins:[
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        json()
    ],
    external:[
        'koa',
        'koa-mount',
        'koa-static',
        'koa-compose',
        'koa-cors',
        'koa-bodyparser',
        'path'
    ]
}