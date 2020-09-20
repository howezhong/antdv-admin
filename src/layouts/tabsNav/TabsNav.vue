<template>
  <div class="nav-tabs-wrap">
    <div class="nav-tabs-prev" @click="onPrev">
      <a-icon type="backward" />
    </div>
    <div class="nav-tabs-next" @click="onNext">
      <a-icon type="forward" />
    </div>
    <a-dropdown overlay-class-name="reset-ant-dropdown" placement="bottomRight">
      <div class="nav-tabs-more">
        <a-icon type="caret-down" />
      </div>
      <a-menu slot="overlay" @click="onExtendClick">
        <a-menu-item v-for="item in extension" :key="item.key">
          <a-icon :type="item.icon" />{{item.name}}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <div class="nav-tabs-list">
      <ul ref="vessel" :style="styleNav">
        <li :ref="`navs-${item.name}`" class="nav-tabs-list-item" :class="{'is-active': isActive===item.name}" v-for="(item, i) in tabsNav" @click="switchTab(item)" :key="item.name">
          <a-dropdown overlay-class-name="reset-ant-dropdown" :trigger="['contextmenu']">
            <div class="dropdown-item">
              <span class="label">{{item.meta.title}}</span>
              <a-icon v-if="item.closable" class="anticon-close" @click.stop="removeTab(item, i)" type="close" />
            </div>
            <a-menu slot="overlay">
              <a-menu-item v-for="expand in extension" @click="onTabClick({key: expand.key, item, i})" :key="`${expand.key}-${i}`">
                <a-icon :type="expand.icon" />{{expand.name}}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { whileFn } from '@/utils/tools'

export default {
  name: 'TabsNav',
  data () {
    return {
      navOffset: 0,
      offset: 0,
      isActive: 'home',
      extension: [
        {
          key: 'left',
          name: '关闭左侧',
          icon: 'arrow-left'
        },
        {
          key: 'right',
          name: '关闭右侧',
          icon: 'arrow-right'
        },
        {
          key: 'other',
          name: '关闭其它',
          icon: 'close'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tabsNav: state => state.app.tabsNav
    }),
    styleNav () {
      return {
        transform: `translate3d(-${this.navOffset}px, 0, 0)`
      }
    }
  },
  watch: {
    $route () {
      this.setActiveName()
    }
  },
  methods: {
    switchTab (item) {
      const vessel = this.$refs.vessel
      const { offsetLeft, offsetWidth } = this.$refs[`navs-${item.name}`][0]
      this.$router.push({
        name: item.name,
        params: this.$route.params,
        query: this.$route.query
      })
      // 标签在可视区内
      if (offsetLeft >= this.navOffset && (offsetLeft + offsetWidth) <= (this.navOffset + vessel.offsetWidth)) return
      // 标签在左侧
      if (this.navOffset > offsetLeft) {
        this.navOffset = offsetLeft
      } else {
        this.navOffset = offsetWidth - (vessel.offsetWidth - offsetLeft)
      }
    },
    /**
     * 1. 可移动区的宽度(scrollWidth)
     * 2. 可视区宽度(offsetWidth)
     */
    onPrev () {
      const { offsetWidth, scrollWidth } = this.$refs.vessel
      if (offsetWidth > scrollWidth || this.navOffset === 0) return false
      this.offset = this.navOffset - offsetWidth
      this.navOffset = (this.offset < 0) ? 0 : this.offset
    },
    /**
     * 1. 可移动区的宽度(scrollWidth)
     * 2. 可视区宽度(offsetWidth)
     */
    onNext () {
      const { offsetWidth, scrollWidth } = this.$refs.vessel
      if (offsetWidth > scrollWidth) return false
      this.offset = this.navOffset + offsetWidth
      const diff = scrollWidth - this.offset
      this.navOffset = (diff < offsetWidth) ? (this.offset - (offsetWidth - diff)) : this.offset
    },
    removeTab (site, idx) {
      const arrs = this.tabsNav.filter(item => item.name !== site.name)
      this.updateTabsNav(arrs)
      if (site.name === this.$route.name) {
        this.$router.push({ name: this.tabsNav[idx - 1].name })
        return false
      }
      const currIndex = this.getCurrRouteByArrIndex()
      if (currIndex === 0) return false
      if (currIndex < idx) {
        this.$router.push({ name: this.tabsNav[idx - 1].name })
      }
    },
    setActiveName (options = null) {
      const site = options || this.$route
      this.isActive = site.name
      this.setTabsNav({
        name: site.name,
        path: site.path,
        meta: site.meta,
        closable: site.name !== 'home'
      })
    },
    onExtendClick ({ key }) {
      const currIndex = this.getCurrRouteByArrIndex()
      if (this.tabsNav.length <= 1) return false
      if (key === 'left' && currIndex !== 0) {
        const home = this.tabsNav.slice(0, 1)
        const arrs = this.tabsNav.slice(currIndex)
        this.updateTabsNav([...home, ...arrs])
      } else if (key === 'right') {
        const arrs = this.tabsNav.slice(0, currIndex + 1)
        this.updateTabsNav(arrs)
      } else if (key === 'other') {
        const arrs = this.tabsNav.filter(item => item.name === this.$route.name || item.name === 'home')
        this.updateTabsNav(arrs)
      }
    },
    /**
     * 首页不可删除
     * @param {String} key 约束条件 left right other
     * @param {Object} item 当前tab对象
     * @param {Number} i 当前tab对象在数组中的下标
     */
    onTabClick ({ key, item, i }) {
      const len = this.tabsNav.length
      if (len <= 1) return false
      const currIndex = this.getCurrRouteByArrIndex()
      if (key === 'left' && i > 1) {
        const home = this.tabsNav.slice(0, 1)
        const arrs = this.tabsNav.slice(i)
        if (this.$route.name !== item.name && currIndex < i) {
          this.$router.push({ name: this.tabsNav[i].name })
        }
        this.updateTabsNav([...home, ...arrs])
      } else if (key === 'right') {
        const arrs = this.tabsNav.slice(0, i + 1)
        if (arrs.length === len) {
          return false
        }
        if (this.$route.name !== item.name && currIndex > i) {
          this.$router.push({ name: this.tabsNav[i].name })
        }
        this.updateTabsNav(arrs)
      } else if (key === 'other') {
        const arrs = this.tabsNav.filter(item => item.name === this.$route.name || item.name === 'home')
        this.updateTabsNav(arrs)
      }
    },
    // 当前页面路由在 tabsNav 数组中的下标
    getCurrRouteByArrIndex () {
      let currIndex
      whileFn(this.tabsNav, (item, i) => {
        if (item.name === this.$route.name) {
          currIndex = i
        }
      })
      return currIndex
    },
    ...mapMutations(['setTabsNav', 'updateTabsNav'])
  },
  mounted () {
    this.setActiveName()
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
