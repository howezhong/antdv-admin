<template>
  <a-layout :class="{'layout-menu-fixed': configs.isFixedMenu}">
    <LayoutAside :collapsed="collapsed" />
    <a-layout :class="classes">
      <LayoutHeader :collapsed="collapsed" @on-click="collapsed=!collapsed" @open-setting="isSetting=true" />
      <tabs-nav v-if="configs.isMultiTab" />
      <a-layout-content>
        <keep-alive :include="cacheList" :max="12">
          <router-view v-if="isReload" />
        </keep-alive>
      </a-layout-content>
    </a-layout>
    <LayoutSetting :visible.sync="isSetting" />
  </a-layout>
</template>
<script>
import LayoutAside from './LayoutAside'
import LayoutHeader from './LayoutHeader'

export default {
  name: 'LayoutMain',
  components: {
    LayoutAside,
    LayoutHeader,
    TabsNav: () => import('@/layouts/tabsNav'),
    LayoutSetting: () => import('./LayoutSetting')
  },
  data () {
    return {
      collapsed: false,
      isReload: true,
      isSetting: false
    }
  },
  computed: {
    classes () {
      return {
        'is-fold': this.collapsed,
        'layout-header-fixed': this.configs.isFixedHeader,
        'layout-multi-tab': this.configs.isMultiTab && this.configs.isFixedHeader
      }
    },
    tabsNav () {
      return this.$store.state.app.tabsNav
    },
    // Get the components that need to be cached
    cacheList () {
      return this.tabsNav.length ? this.tabsNav.filter(item => item.meta && item.meta.keepAlive).map(item => item.name) : []
    },
    // Whether to open multiple tabs
    configs () {
      return this.$store.getters.configs
    }
  },
  provide () {
    return {
      reloading: this.reloading
    }
  },
  methods: {
    // Refresh the current component
    reloading () {
      this.$progress.start()
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
        this.$progress.finish()
      })
    }
  }
}
</script>

<style lang="less">
.ant-layout {
  &.ant-layout-has-sider {
    min-height: 100%;
  }
}
.ant-layout-content {
  padding: 15px;
  background: #fff;
}
.layout-menu-fixed {
  .ant-layout-sider {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
  }
  .ant-layout-sider-children {
    margin-right: -16px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  & > .ant-layout {
    margin-left: @layout-sider-width;
    transition: all 0.2s;
    &.is-fold {
      margin-left: @layout-sider-width-fold;
      &.layout-header-fixed {
        .ant-layout-header,
        .nav-tabs-wrap {
          left: @layout-sider-width-fold;
        }
      }
    }
  }
}
.layout-header-fixed {
  padding-top: @header-height;
  .ant-layout-header,
  .nav-tabs-wrap {
    position: fixed !important;
    left: @layout-sider-width;
    right: 0;
    z-index: 5;
    transition: all 0.2s;
  }
  .ant-layout-header {
    top: 0;
  }
  .nav-tabs-wrap {
    top: @header-height;
  }
  &.is-fold {
    .ant-layout-header,
    .nav-tabs-wrap {
      left: @layout-sider-width-fold;
    }
  }
}
.layout-multi-tab {
  padding-top: calc(@header-height + @nav-height + 1px);
}
</style>
