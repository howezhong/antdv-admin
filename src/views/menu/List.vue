<template>
  <div class="wrap">
  </div>
</template>
<script>
import { getAllMenus } from '@/api/menu'

export default {
  name: 'MenuList',
  data () {
    return {
      lists: [],
      loading: false
    }
  },
  methods: {
    edit (query) {},
    init () {
      this.loading = true
      getAllMenus({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const { status, msg, data } = res
        console.log(data)
        if (status !== 200) {
          this.$message.warning(msg)
          return false
        }
        this.lists = data.list || []
        this.total = data.total
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
