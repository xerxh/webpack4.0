const path = require('path')
// 优化将公共库抽取来单独打包 只打包一次提高后续打包速度
// 目标：第三方模块只打包一次
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output: {
        filename: '[name].dell.js',
        path: path.resolve(__dirname, '../dell'),
        library: '[name]' // vendors
    }
}