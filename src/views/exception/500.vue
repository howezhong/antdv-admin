<template>
  <Contents :src="require('@/assets/image/exception/500.svg')" tips="抱歉，服务器报告错误~" />
</template>

<script>
export default {
  name: 'ex_500',
  components: {
    Contents: () => import('./Content.vue')
  }
}
</script>
