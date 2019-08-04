const {join} = require('path');
const {author, license, name, version} = require('./package.json');
const cwd = __dirname;

console.log(`开始打包 \n`);

module.exports = {
    plugins: {
        commonjs: true
    },
    banner: {
        author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/json2vue`,
        license,
        name,
        version
    },
    globals: {
        vue: 'Vue',
    },
    externals: ['vue', 'Vue'],
    output: {
        format: ['umd', 'umd-min'],
        moduleName: 'json2vue',
        fileName: 'json2vue[min].js'
    },
    input: join(cwd, '/src/index.ts'),
    env: {
        'NODE_ENV': 'production',
        'VERSION': version,
    }
};