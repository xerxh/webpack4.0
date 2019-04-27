const path = require('path')
const webpack = require('webpack')
// 优化将公共库抽取来单独打包 只打包一次提高后续打包速度
// 目标：第三方模块只打包一次
// 引入第三方模块的时候，需要去使用dll文件

// 可使用thread-loader 进行多进程打包
// 可使用parallel-webpack  happypack进行多页面打包
module.exports = {
    mode: 'production',
    entry: {
            // 可以对模块进行拆分
        // vendors: ['react', 'react-dom', 'lodash']
        vendors: ['lodash'],
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].dell.js',
        path: path.resolve(__dirname, '../dell'),
        library: '[name]' // vendors  通过全局变量暴露出来
    },
    plugins: [
        // 对抽取出来的dll文件库进行分析
        new webpack.DllPlugin({
            name: '[name]',
            // 生成第三方模块的文件映射关系文件
            path: path.resolve(__dirname, '../dell/[name].manifest.json')
        })
    ]
}