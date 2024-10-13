const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en', 'ja'], // 対応する言語を定義
    defaultLocale: 'en', // デフォルト言語を定義
    localeDetection: true, // 自動言語検出
  },
}