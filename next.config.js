const path = require('path');
const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  //output: 'export',
  trailingSlash: true,
});
