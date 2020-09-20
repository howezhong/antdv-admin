const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isExecute = false

function gzipFn (config) {
  if (isExecute) {
    // 开启Gzip压缩, 需要服务器也开启gzip
    config.plugin('gzip-plugin').use(CompressionWebpackPlugin, [{
      filename: '[path].gz[query]',
      test: /\.js$|\.html$|\.json$|\.css$|\.ttf$/, // 处理所有匹配此 {RegExp} 的资源
      algorithm: 'gzip', // 算法, 默认 gzip
      threshold: 10240, // 按字节计算,只处理大于该值的资源, 默认0
      // minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理, 默认0.8
      deleteOriginalAssets: true // 是否删除未压缩的源文件 (默认false则删除打包后的文件还可以加载到原始资源文件)
    }]).end()
  }
}

module.exports = { gzipFn }
