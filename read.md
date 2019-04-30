## 业务代码的webpack配置

## global
  1. webpack index.js
## local
  2. npx webpack index.js
## webpack  script
  3. npm run buid --> webpack
## webpack-cli 使得我们可以在命令行中使用 webpack指令
  4. npx eslint --init

## 提高webpack构建速度
- 将大型库外链  externals 将常用库引入外链作为library
- 将库进行预编译
- 减少构建搜索或便宜路径
- 缓存
- 并行