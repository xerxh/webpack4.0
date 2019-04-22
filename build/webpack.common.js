    // 利用webpack-merge插件将公共部分和环境配置进行合并
    // npm i -D webpack-merge
const path = require('path')
// htmlwebpackplugin 会在打包结束后，自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
const htmlWebpackplugin = require('html-webpack-plugin')
// // 清除上一次打包的目录  以便重新打包
const cleanwebpackplugin = require('clean-webpack-plugin')
//
const webpack= require('webpack')
    // 利用环境变量来提取代码
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const merge = require('webpack-merge')


// 将production 和 devlopment环境共同的代码提取出来
const commonConfig = { 
    entry: {
        lodash: './src/lodash.js',
        main: './src/source.js',
        // codeSplit: './src/codeSplit.js',
        // test_babel: './src/test_es6.js',
        reactBabel: './src/reactbabel.js',
        // treeShaking: './src/treeShaking.js',
        sub: './src/index.js'
    },
    output: {
        // publicPath: '/',
        // filename: '[name].js',
        // // 被间接引用的库或文件打包会走chunkfilename
        // chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist')
    },
    // 去掉大于文件大于24K的警告提示
    performance: false,
    // 模块打包配置 
    module: {
        // 规则
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/, // 忽略文件夹
                use: [
                    {
                        loader: "babel-loader"
                    },
                    // 利用imports-loader来修改所以模块中的this指向
                    // {
                    //     loader: "imports-loader?this=>window"
                    // }
                ]     
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
        // shimming 垫片
        new webpack.ProvidePlugin({
            // 如果一个模块中使用了$符号就会自动在模块中引入jquey
            // 并将jqery赋值为$
            $: 'jquery',
            _: 'lodash',
            _join: ['lodash', 'join']
        })
        // new webpack.HotModuleReplacementPlugin(),
        //使用插件对 tree shanking 优化后的继续进行压缩 未使用的方法不会被打包进代码 使用后不支持source-map
        // new UglifyJsPlugin({
        //     test: /\.js$/
        // }),
    ],
    // codeSplit 公共代码切割配置（对公用类库自动进行分割）
    // css也可以进行分割
    optimization: {
        splitChunks: {
            chunks: 'all',
            // chunks: "async", // 做代码分割只对异步有效
            minSize: 30000,  // >3W字节才进行代码分割 30KB
            // maxSize: 50000 >50kb将会尝试进行二次拆分
            minChunks: 1, // 当一个模块至少使用了多少次才进行代码分割
            maxAsyncRequests: 5, // 同时加载的模块数最大为5个
            maxInitialRequests: 3, // 入口文件最多三个分割文件
            automaticNameDelimiter: '~', //文件打包名字连接符
            name: true,
            // 实现同步代码分割
            cacheGroups: { // 缓存组
                // vendors: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //权重（优先级）
                    name: 'vendors'
                },
                // default: false
                default: { // 当不在 node_modules文件夹内 会启动默认设置
                    priority: -20,
                    reuseExistingChunk: true, //如果一个模块已经被打包过了 会复用原先的模块
                    name: 'default.js' // split 出来的 chunk 的名字
                }
            }
        }
    }
}


// 利用环境变量进行不同merge导出配置
module.exports = (env) => {
    console.log(env, '________________')
    if ( env && env.production ) {
        return merge(commonConfig, prodConfig)
    }else{
        return merge(commonConfig, devConfig)
    }
}