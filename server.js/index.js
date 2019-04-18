const express = require('express');
const webpack = require('webpack');
const webpackEevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js'); // 需要加.js后缀名
// 在node中使用webpack
const complier = webpack(config);  // 根据config返回一个编译器
const app = express()
app.use(webpackEevMiddleware(complier, {
   publicPath: config.output.publicPath 
}))
app.listen(3000, () => {
    console.log('server is running')
})