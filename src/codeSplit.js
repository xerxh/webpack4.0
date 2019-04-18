// webpack代码分割  使用codeSplit进行代码切割 
// import _ from 'lodash'  // 1MB + 代码大小
// import _ from 'loadsh';

// 假设此处有10w行代码 
// 打包时会将所有代码打入一个js文件中  体积会很大 加载时间会很长
console.log(_.join(['a', 'b', 'c']))


// 异步代码分割
function getComponet() {
    return import(/* webpackChunkName="lodashfuben" */'lodash').then(() => {
        var el = document.createElement('div')
        el.innerHTML = _.join(['alo', 'alo', 'alo'], '__')
        return el
    })
}
getComponet().then(el => {
    document.body.appendChild(el)
})
//将整个js文件 拆分成2个
// lodash.js 1MB
// 本身代码文件大小
// 浏览器可以并行加载8个
// 当业务逻辑发生变化时不会加载lodash库只会加载自身文件
// 将代码公用部分进行拆分 提高代码的效率



// 代码分割 和 webpack无关 是一种概念
// webpack中实现代码分割的两种方式
// 1. 同步代码 只需要在webpack.common.js做optimization的配置
// 2. 异步代码（import）异步代码需要下载插件 babel-plugin-dynamic-import-webpack 并在babel配置里进行plugins配置