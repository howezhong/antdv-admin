import Vue from 'vue'
import Vuex from 'vuex'

// module
import app from './module/app'
import systemConfig from './module/systemConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data || {}
    }
  },
  modules: {
    app,
    systemConfig
  }
})
