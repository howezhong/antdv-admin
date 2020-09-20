<template>
  <a-layout-header>
    <div class="left">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="handleClick" />
       <a-tooltip placement="bottom" @click="reloading()">
        <template slot="title">
          <span>刷新</span>
        </template>
        <a-icon class="trigger cp" type="sync" />
      </a-tooltip>
    </div>
    <div class="right">
      <div class='setting-wrap' @click="openSetting">
        <a-tooltip placement="bottom">
          <a-icon type="layout" />
          <template slot="title">
            <span>布局配置</span>
          </template>
        </a-tooltip>
      </div>
      <Fullscreen />
      <avatar-name class="z-avatar-name"></avatar-name>
    </div>
  </a-layout-header>
</template>
<script>
import AvatarName from '@@/avatarName/AvatarName'
import Fullscreen from '@@/fullscreen/Fullscreen'

export default {
  name: 'LayoutHeader',
  components: {
    AvatarName,
    Fullscreen
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  inject: ['reloading'],
  methods: {
    handleClick () {
      this.$emit('on-click')
    },
    openSetting () {
      this.$emit('open-setting')
    }
  }
}
</script>

<style lang='less' scoped>
.ant-layout-header {
  .flex(@ji: space-between);
  background: @header-background;
  border-bottom: 1px solid @nav-tabs-border-color;
  .left {
    padding-left: 10px;
  }
  .trigger {
    font-size: @header-font-size;
    padding: 0 12px;
    .transition();
    &:hover {
      color: @primary-color;
    }
  }
  .left,
  .right {
    display: inline-flex;
    align-items: center;
  }
}
</style>
