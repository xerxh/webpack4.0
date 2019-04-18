// tree shaking 引入什么就打包什么 减少打包体积  
// 只支持ES Module  即import模块的引入
// 如果引入没有导出  tree shaking会直接打包忽略
// 如 import '@babel/polyfill'（引入整个库）
// 需要在package.json 中 对 
// "sideEffects": ["@babel/polly-fill", *.css]进行配置
// *.css对于css模块的引入 不进行忽略
// import '@babel/polyfill'


/**
 * development模式下，不管设置"sideEffects": false 还是 “sideEffects”: [".css"],
 * style.css都不会被tree shaking，页面样式还是会生效，结论就是，开发模式下，对于样式文件tree shaking是不生效的
 * production模式下，“sideEffects”: false页面样式不生效，说明样式文件被tree shaking了；
 * 然后设置"sideEffects": [".css"]样式生效，说明样式文件没有被tree shaking，
 * 结论就是，生产模式下，对于样式文件tree shaking是生效的
 */
import { add } from "./util/math"

add(1, 2)