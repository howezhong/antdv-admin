<template>
  <div class="avatar-name-box">
    <a-dropdown class="avatar-name">
      <a class="ant-dropdown-link" href="#">
        <a-avatar class="avatar" icon="user" shape="circle" :src="avatar" />
        <span class="username">稻香</span>
      </a>
      <a-menu slot="overlay" style="min-width:150px;">
        <a-menu-item>
          <a-icon type="user" />
          <span>个人中心</span>
        </a-menu-item>
        <a-menu-item>
          <a-icon type="setting" />
          <span>设置</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="logout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { removeToken } from '@/utils/token'

export default {
  name: 'AvatarName',
  computed: {
    avatar () {
      return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    }
  },
  methods: {
    logout () {
      removeToken()
      this.$router.push('login')
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-name-box {
  margin-right: 30px;
  & .avatar-name {
    padding: 0 12px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    text-decoration: none;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  & .avatar {
    margin-right: 8px;
  }
  & .username {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
