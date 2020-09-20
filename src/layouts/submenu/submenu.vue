<template functional>
  <a-sub-menu :key="props.menuInfo.name">
    <span slot="title">
      <a-icon v-if="props.menuInfo.meta.icon" :type="props.menuInfo.meta.icon" />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="item.children.length===0" :key="props.format(item)">
        <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.name" />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {}
    },
    format: Function
  }
}
</script>
