const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    // 不将库打包到包中
    externals: ['lodash'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
            // 当通过script引入我们的包时将函数挂在在全局变量library上
        library: 'library',
            // 保证打包的库 无论是AMD 还是 cmd引入都能正确被引入
        libraryTarget: 'umd'
            // 配合library使用 挂载到全局的this上
        // libraryTarget: 'this'
    }
}