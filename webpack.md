# 提升webpack打包速度的方法（大型项目）
1. 跟上技术的迭代 (node, npm ,yarn新版本有优化)
2. 在尽可能少的模块上使用loader
3. plugin尽可能精简并确保可靠
4. 合理的优化配置resolve参数
5. 使用DllPlugin提高打包速度
6. thread-loader parallel-webpack  happypack 进行多进程打包

## 当对对页面应用打包