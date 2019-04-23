// import _ from 'loadsh'; // 1MB
// import $ from 'jquery';
import ui from './shimming';
// webpack浏览器缓存
const dom = $('<div>');
dom.html(_.join(['alo', 'alo', 'al'], '---'));
$('body').append(dom);

// shimming
// 直接调用 $找不到 webpack是用模块打包的每个模块都是独立的
// 变量是隔离的
// 对于依赖其他函数库的库 利用shimming来解决
ui();
window._ = _;
