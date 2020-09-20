<template>
  <div class="pagination-wrap">
    <a-pagination :current="page" :page-size="pageSize" :page-size-options="pageSizeOpts" v-bind="$attrs" show-size-changer show-quick-jumper @change="changePage" @showSizeChange="changePageSize" hideOnSinglePage />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'Pagination',
  data () {
    return {
      page: 1, // 当前页数
      pageSize: 15,
      pageSizeOpts: ['15', '20', '30', '40']
    }
  },
  methods: {
    // 页码改变的回调, 返回改变后的页码
    changePage (page) {
      this.page = page
      this.$emit('change', page)
    },
    // 切换每页条数时的回调, 返回切换后的每页条数
    changePageSize (current, size) {
      this.page = current
      this.pageSize = size
      this.$emit('changePageSize', size)
    }
  }
}
</script>
<style lang='less' scoped>
.pagination-wrap {
  padding: 15px 0;
}
</style>
