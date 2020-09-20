import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import progress from '@@/progressBar'

import '@/styles/index.less'

if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.prototype.$progress = progress
Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
