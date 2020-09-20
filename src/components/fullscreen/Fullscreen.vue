<template>
  <div class='setting-wrap' @click="toggleFullscreen">
    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{isFullscreen ? '退出全屏' : '全屏'}}</span>
      </template>
      <a-icon :type="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
    </a-tooltip>
  </div>
</template>

<script>
const types = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange']
export default {
  name: 'Fullscreen',
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    toggleFullscreen () {
      const el = document.documentElement
      if (this.isFullscreen) { // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (el.requestFullscreen) {
          el.requestFullscreen() // W3C
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen() // FireFox
        } else if (el.webkitRequestFullScreen) {
          el.webkitRequestFullScreen() // Chrome
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen() // IE11
        }
      }
    },
    setFullscreen () {
      this.isFullscreen = !this.isFullscreen
    }
  },
  mounted () {
    types.forEach(item => {
      window.addEventListener(item, () => this.setFullscreen())
    })
  },
  destroyed () {
    types.forEach(item => {
      window.removeEventListener(item, this.setFullscreen)
    })
  }
}
</script>
