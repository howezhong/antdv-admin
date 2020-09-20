import { setStore, getStore } from '@/utils/tools'

function setConfig (data) {
  return setStore('sys_config', data)
}

function getConfig () {
  return getStore('sys_config')
}

const state = {
  configs: getConfig() ? getConfig() : {
    asideTheme: 'dark',
    isFixedHeader: true,
    isFixedMenu: true,
    isMultiTab: true,
    isExpandAllMenus: false // 是否展开所有菜单
  }
}

const mutations = {
  setAsideTheme (state, bool) {
    state.configs.asideTheme = bool
    setConfig(state.configs)
  },
  setFixedHeader (state, bool) {
    state.configs.isFixedHeader = bool
    setConfig(state.configs)
  },
  setFixedMenu (state, bool) {
    state.configs.isFixedMenu = bool
    setConfig(state.configs)
  },
  setMultiTab (state, bool) {
    state.configs.isMultiTab = bool
    setConfig(state.configs)
  },
  setExpandAllMenus (state, bool) {
    state.configs.isExpandAllMenus = bool
    setConfig(state.configs)
  }
}

const getters = {
  configs: state => state.configs,
  asideTheme: state => state.configs.asideTheme,
  isExpandAllMenus: state => state.configs.isExpandAllMenus
}

export default { state, mutations, getters }
