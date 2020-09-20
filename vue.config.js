const path = require('path')
const { chainFn, configureFn } = require('./plugins/cdn')
const { spriteFn } = require('./plugins/sprite')
const { uglifyJs } = require('./plugins/uglifyJs')
const { gzipFn } = require('./plugins/gzip')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const BASE_URL = isProd ? '/' : '/'

// 是否合并雪碧图
const isSprite = false

module.exports = {
  publicPath: BASE_URL,
  // 如果你不需要使用eslint, 把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@@', resolve('src/components'))
      .set('@img', resolve('src/assets/image'))
      .set('~', resolve('src/styles'))
    config.plugins.delete('prefetch') // 静态资源js按需加载配置

    if (isProd) {
      // 生产环境注入cdn
      chainFn(config)
      // 图片压缩
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
      // 删除预加载, prefetch告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容
      // config.plugins.delete('preload')
      // config.plugins.delete('prefetch')
      gzipFn(config)
    }
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    // 引入全局css变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/variable.less')]
    }
  },
  configureWebpack: config => {
    if (isProd) {
      // 用cdn方式引入
      configureFn(config)
      // 代码压缩
      uglifyJs(config)
    }
    if (isSprite) {
      config.plugins.push(spriteFn())
    }
  },
  devServer: {
    port: 8080, // 端口
    // open: true, // 自动开启浏览器
    // compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
