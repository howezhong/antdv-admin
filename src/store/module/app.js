import { isExistByArrs, setStore, getStore } from '@/utils/tools'

export default {
  state: {
    // 多标签页
    tabsNav: getStore('tabsNav') || []
  },
  mutations: {
    setTabsNav (state, data) {
      if (!isExistByArrs(state.tabsNav, data)) {
        state.tabsNav.push(data)
        setStore('tabsNav', state.tabsNav)
      }
    },
    updateTabsNav (state, data) {
      state.tabsNav = data
      setStore('tabsNav', data)
    }
  },
  actions: {
  }
}
