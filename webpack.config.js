const path = require('path')
// htmlwebpackplugin 会在打包结束后，自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
const htmlWebpackplugin = require('html-webpack-plugin')
const cleanwebpackplugin = require('clean-webpack-plugin')
module.exports = {
    //mode: 'production', // 打包模式  默认production
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'build')
    },
    // 模块打包配置 
    module: {
        // 规则
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader', // 适合小图片 转换成base64
                    // load配置项
                    options: {
                        // placeholder 占位符 ext原始文件的后缀
                        name: '[name]-[hash].[ext]',
                        limit: 2048, // 小于2M打包成base64 否则打包成单独文件
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader', 
                        options: {
                            importLoaders: 2, // 指定import语法 也需要走相应的loader而不是直接走css-loader
                            // modules: true // 开启css的模块化打包
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            { // 字体文件打包
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // placeholder 占位符 ext原始文件的后缀
                        name: '[name]-[hash].[ext]',
                        outputPath: 'font/'
                    }
                }
            }
        ]
    },
    // plugin可以在webpack运行到某个阶段/时刻时，帮我们做一些事情
    plugins: [
        new htmlWebpackplugin({
            template: 'src/index.html'
        }),
        new cleanwebpackplugin()
    ]
}