// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function uglifyJs (config) {
  config.plugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      // 生产环境自动删除console
      compress: {
        drop_debugger: true,
        drop_console: true,
        pure_funcs: ['console.log']
      }
    },
    sourceMap: false, // 使用 source map 将错误信息的位置映射到模块(这会减慢编译的速度)
    parallel: true // 使用多进程并行运行和文件缓存来提高构建速度
  }))
}

module.exports = { uglifyJs }
