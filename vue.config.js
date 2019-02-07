const BannerPlugin = require('webpack').BannerPlugin

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Silbentrenner/' : '/',
  chainWebpack: config => {
    config.plugin('hypher-license')
      .use(BannerPlugin, [{
        test: /chunk-vendors/,
        banner: `Hypher (https://github.com/bramstein/hypher)
Copyright (c) 2011, Bram Stein
Licensed under three clause BSD (https://github.com/bramstein/hypher/blob/master/BSD.txt)

hyphenation-patters (german version, 'de') (https://github.com/bramstein/hyphenation-patterns)
Licensed under LGPL (https://github.com/bramstein/hyphenation-patterns#license)`
      }])
  }
}
