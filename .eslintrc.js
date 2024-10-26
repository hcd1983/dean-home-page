module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended' // 讓 ESLint 使用 Prettier 的規則
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error' // 當 Prettier 檢查出問題時報錯
    }
  }
  