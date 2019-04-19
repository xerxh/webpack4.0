    // 公共部门进行代码提取
// const path = require('path')
// // htmlwebpackplugin 会在打包结束后，自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
// const htmlWebpackplugin = require('html-webpack-plugin')
// // 清除上一次打包的目录  以便重新打包
// const cleanwebpackplugin = require('clean-webpack-plugin')
// // UglifyjsWebpackPlugin ， 来进行我们的摇树优化

// var UglifyJsPlugin = require('uglifyjs-webpack-plugin') 
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const devConfig = {
    mode: 'development',
    devtool: '@#cheap-module-eval-source-map',  // 关source.map 错误代码的映射位置
    output: {
        filename: '[name].js',
        // 被间接引用的库或文件打包会走chunkfilename
        chunkFilename: '[name].chunk.js',
    },
    devServer: {
        contentBase: './dist', // 监听打包的目录
        open: true, // 自动打开开启的页面
        port: 8080,
        hot: true,   // 开启热更新
        hotOnly: true // 不自动刷新浏览器
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
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
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}

//  合并两个配置文件
module.exports = merge(commonConfig, devConfig)