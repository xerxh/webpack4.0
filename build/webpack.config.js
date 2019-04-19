const path = require('path')
// htmlwebpackplugin 会在打包结束后，自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
const htmlWebpackplugin = require('html-webpack-plugin')
// 清除上一次打包的目录  以便重新打包
const cleanwebpackplugin = require('clean-webpack-plugin')
// UglifyjsWebpackPlugin ， 来进行我们的摇树优化
var UglifyJsPlugin = require('uglifyjs-webpack-plugin') 
const webpack = require('webpack')

module.exports = {
    mode: 'production', // 打包模式  默认production
    devtool: '@#cheap-module-source-map',
    // mode: 'development',
    // devtool: '@#cheap-module-eval-source-map',  // 关source.map 错误代码的映射位置
    entry: {
        main: './src/source.js',
        test_babel: './src/test_es6.js',
        reactBabel: './src/reactbabel.js',
        treeShaking: './src/treeShaking.js'
        // sub: './src/index.js'
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    // 将会启动一个服务器监听需要打包文件的变化，自动编译(热更新)
    devServer: {
        contentBase: './build', // 监听打包的目录
        open: true, // 自动打开开启的页面
        // proxy: {},
        port: 8080,
        hot: true,   // 开启热更新
        hotOnly: true
    },
    // 模块打包配置 
    module: {
        // 规则
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/, // 忽略文件夹
                loader: "babel-loader"
            },
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
        new cleanwebpackplugin(),
        new webpack.HotModuleReplacementPlugin(),
        //使用插件对 tree shanking 优化后的继续进行压缩 未使用的方法不会被打包进代码 使用后不支持source-map
        // new UglifyJsPlugin({
        //     test: /\.js$/
        // }),
    ],
    // tree shaking 配置 （import 引入什么打包什么）  在开发环境下    使用无效  在product环境下 无需配置
    // 还需要在 pack.json 加入配置 "sideEffects": false
    // optimization: {
    //     useExports: true
    // }
}