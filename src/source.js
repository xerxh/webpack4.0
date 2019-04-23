// build目录下mian.js  96行代码出错
// sourceMap 是一个映射关系 他知道build目录下main.js文件第96行 实际上对于的是src目录下index.js文件中的第一行
// 可以通过映射转换 获得准确的位置

import './index.css';
import './style.css';

import counter from './conter';
import number from './number';

counter();
number();
if (module.hot) {
  // 监听该模块的变化 如果变化 重新调用渲染
  module.hot.accept('./number', () => {
    console.log(222222);
    number();
  });
  module.hot.accept('./conter', () => {
    console.log(111);
    counter();
  });
}
console.log('hello world!~');
// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)
// btn.onclick = function() {
//     var div = document.createElement('div');
//     div.innerHTML = 'item'
//     document.body.appendChild(div)
// }
// console.log(hello)
