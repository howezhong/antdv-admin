<template>
  <div class="exception-content">
    <div class="inner">
      <img :src="src">
      <p class="tips">{{ tips }}</p>
      <div class="back-btn-group">
        <a-button class="mr10" type="primary" @click="backHome">返回首页</a-button>
        <a-button type="primary" @click="backPrev">返回上一页({{ second }}s)</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    src: String,
    tips: String
  },
  data () {
    return {
      second: 6,
      timer: null
    }
  },
  methods: {
    backHome () {
      this.$router.replace({ name: 'home' })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.exception-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f8f8f9;
  .inner {
    width: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    text-align: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .tips {
    color: #67647d;
    font-size: 18px;
    margin-top: 30px;
  }
  .back-btn-group {
    margin-top: 20px;
  }
}
</style>
