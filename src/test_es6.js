// import "@babel/polyfill";  // babel函数填充库
// ES6 babel 测试
const arr = [
    new Promise(() => {
        console.log('promise1')
    }),
    new Promise(() => {
        console.log('promise2')
    })
]
arr.map(item => {
    console.log(item)
})