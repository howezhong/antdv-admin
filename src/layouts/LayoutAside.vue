<template>
  <a-layout-sider :theme="asideTheme" v-model="collapsed" :trigger="null" collapsible>
    <div class="layout-logo"></div>
    <a-menu :theme="asideTheme" mode="inline" :default-selected-keys="defaultSelectedKeys" :open-keys="openKeys" :selected-keys="selectedKeys" @openChange="onOpenChange" @select="selected">
      <template v-for="item in menus">
        <a-menu-item v-if="item.children.length===0" :key="isExternalLink(item)">
          <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <submenu v-else :menu-info="item" :format="isExternalLink" :key="item.name" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import Submenu from './submenu'
import { getMenuByRouter } from '@/utils/utils'
import { openNewPage, hasHttpOrHttps } from '@/utils/tools'
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutAside',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Submenu
  },
  data () {
    return {
      menus: [],
      defaultSelectedKeys: [],
      selectedKeys: [],
      rootSubmenuKeys: [],
      openKeys: [],
      theme: 'dark'
    }
  },
  computed: {
    asideTheme () {
      return this.$store.getters.asideTheme
    },
    isExpandAllMenus () {
      return this.$store.getters.isExpandAllMenus
    }
  },
  watch: {
    $route () {
      this.selectedKeys = []
      this.setActiveName()
    },
    // 展开菜单
    collapsed () {
      this.isOpenChildren()
    },
    isExpandAllMenus () {
      this.onOpenChange()
    }
  },
  methods: {
    isExternalLink (item) {
      return (item.meta && item.meta.links) ? `externalLink_${item.name}-${item.meta.links}` : item.name
    },
    /**
     * 默认选中的菜单
     * @param {String} key home
     * @param {Array} openKeys ['home']
     */
    selected ({ key, selectedKeys }) {
      if (key.indexOf('externalLink_') > -1) {
        let URL = key.split('-')[1]
        !hasHttpOrHttps(URL) && (URL = `http://${URL}`)
        openNewPage(URL, URL.split('.')[1])
        return false
      }
      this.selectedKeys = selectedKeys
      this.$router.push({ name: key })
      this.onOpenChange()
    },
    /**
     * 默认展开的菜单
     * @param {Array} openKeys ['home']
     */
    onOpenChange (openKeys) {
      // 是否展开所有菜单; 在折叠的情况下, 鼠标hover菜单限制只会展示当前菜单的子菜单
      if (!this.collapsed && this.isExpandAllMenus) {
        this.openKeys = this.rootSubmenuKeys
        return false
      }
      if (!openKeys) {
        const name = this.$route.fullPath.split('/')[1]
        openKeys = [name]
      }
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    getMenus () {
      const routes = this.$router.options.routes
      this.menus = getMenuByRouter(routes)
      if (this.menus.length) {
        this.defaultSelectedKeys.push(this.$route.name)
        this.setActiveName()
        this.setTabsNav({
          name: this.menus[0].name,
          path: this.menus[0].path,
          meta: this.menus[0].meta,
          closable: false
        })
      }
    },
    isOpenChildren () {
      if (this.collapsed) {
        this.openKeys = []
      } else {
        this.onOpenChange()
      }
    },
    /**
     * 1. 设置当前选中的菜单项
     * 2. 更新要展开的父级菜单项
     */
    setActiveName () {
      this.selectedKeys.push(this.$route.name)
      this.menus.forEach(item => this.rootSubmenuKeys.push(item.name))
      this.isOpenChildren()
    },
    ...mapMutations(['setTabsNav'])
  },
  mounted () {
    this.getMenus()
  }
}
</script>

<style lang="less" scoped>
.layout-logo {
  .flex();
  height: @header-height;
}
</style>
