<template>
  <a-drawer class='setting-drawer' title="系统配置" placement="right" :closable="false" :visible="isOpen" @close="onClose">
    <div class="setting-drawer-item">
      <a-divider>主题配置</a-divider>
      <a-radio-group :value="systemConfig.asideTheme" button-style="solid" @change="onChange">
        <a-radio-button value="light">亮白</a-radio-button>
        <a-radio-button value="dark">暗黑</a-radio-button>
      </a-radio-group>
    </div>
    <div class="setting-drawer-item">
      <a-divider>界面风格</a-divider>
      <a-list :split="false">
        <a-list-item>
          <a-switch slot="actions" checked-children="开" un-checked-children="关" :default-checked="systemConfig.isFixedHeader" @change="changeFixedHeader" />
          <a-list-item-meta>
            <div slot="title">固定header</div>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <a-switch slot="actions" checked-children="开" un-checked-children="关" :default-checked="systemConfig.isMultiTab" @change="changeMultiTab" />
          <a-list-item-meta>
            <div slot="title">开启多标签页</div>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <a-switch slot="actions" checked-children="开" un-checked-children="关" :default-checked="systemConfig.isFixedMenu" @change="changeFixedMenu" />
          <a-list-item-meta>
            <div slot="title">固定左侧菜单</div>
          </a-list-item-meta>
        </a-list-item>
        <a-list-item>
          <a-switch slot="actions" checked-children="开" un-checked-children="关" :default-checked="systemConfig.isExpandAllMenus" @change="changeExpandAllMenus" />
          <a-list-item-meta>
            <div slot="title">展开所有菜单</div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </a-drawer>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutSetting',
  props: {
    visible: Boolean
  },
  data () {
    return {
      isOpen: this.visible
    }
  },
  watch: {
    visible () {
      this.isOpen = this.visible
    }
  },
  computed: {
    systemConfig () {
      return this.$store.state.systemConfig.configs
    }
  },
  methods: {
    ...mapMutations([
      'setAsideTheme',
      'setFixedHeader',
      'setFixedMenu',
      'setMultiTab',
      'setExpandAllMenus'
    ]),
    onClose () {
      this.isOpen = false
      this.$emit('update:visible', false)
    },
    onChange (e) {
      this.setAsideTheme(e.target.value)
    },
    changeFixedHeader (checked) {
      this.setFixedHeader(checked)
    },
    changeFixedMenu (checked) {
      this.setFixedMenu(checked)
    },
    changeMultiTab (checked) {
      this.setMultiTab(checked)
    },
    changeExpandAllMenus (checked) {
      this.setExpandAllMenus(checked)
    }
  }
}
</script>
<style lang='less' scoped>
.setting-drawer {
  overflow: hidden;
  ::v-deep .ant-drawer-body {
    padding: 0;
  }
}
.setting-drawer-item {
  padding: 0 20px;
}
.ant-list-item-meta-title {
  margin-bottom: 0;
}
</style>
