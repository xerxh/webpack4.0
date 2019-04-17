// npx webpack --config webpackConfig.js 指定webpack依靠哪个配置文件打包

const path = require('path')
module.exports = {
    entry: './index.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'test')
    }
} 