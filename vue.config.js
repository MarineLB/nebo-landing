const path = require("path");

module.exports = {
  chainWebpack: config => config.resolve.set('symlinks', false),
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/style/global.scss'),]
    }
  }
};