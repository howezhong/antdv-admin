<template>
  <Contents :src="require('@/assets/image/exception/404.svg')" tips="抱歉，您访问的页面不存在~" />
</template>

<script>
export default {
  name: 'ex_404',
  components: {
    Contents: () => import('./Content.vue')
  }
}
</script>
