
var UglifyJsPlugin = require('uglifyjs-webpack-plugin') 
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
// css代码分割
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const prodConfig = {
    mode: 'production', // 打包模式  默认production
    // devtool: '@#cheap-module-source-map',
    output: {
        // 生产环境加入hash防止名字相同浏览器缓存
        filename: '[name].[contenthash].js',
        // 被间接引用的库或文件打包会走chunkfilename
        chunkFilename: '[name].[contenthash].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    // 'style-loader', 
                    MiniCssExtractPlugin.loader, //利用代码分割的loader
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
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    // css代码压缩
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /\.js$/
        }),
        // 需要搭配loader使用
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)