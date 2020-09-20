<template>
  <Contents :src="require('@/assets/image/exception/403.svg')" tips="抱歉，您无权访问此页面~" />
</template>

<script>
export default {
  name: 'ex_403',
  components: {
    Contents: () => import('./Content.vue')
  }
}
</script>
