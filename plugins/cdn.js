const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'ant-design-vue': 'ant-design-vue',
    moment: 'moment'
  },
  css: [],
  js: [
    // https://unpkg.com/browse/vue@2.6.10/
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/ant-design-vue@1.5.5/dist/antd.min.js'
  ]
}

function chainFn (config) {
  // 生产环境注入cdn
  config.plugin('html').tap(args => {
    args[0].cdn = assetsCDN
    return args
  })
}

function configureFn (config) {
  // 用cdn方式引入
  config.externals = assetsCDN.externals
}

module.exports = {
  chainFn,
  configureFn
}
