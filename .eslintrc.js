module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // 使用airbnb的规范
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    // 不允许对其进行覆盖
    document: false,
    $: false,
    _: false,
    _join: false,
    SharedArrayBuffer: 'readonly',
  },
  // "env": { "es6": true },
  // 使用什么解释器
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6, // es版本
    sourceType: 'module', 
  },
  plugins: [
    'react',
  ],
  rules: {
    // 不遵循该要求
    // "react/prefer-stateless-function": 0,
    // 运行在 .js文件中 使用JSX语法
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // 不检测分号
    "semi": [0]
  },
};
