// 分页配置公共信息
export default {
  data () {
    return {
      page: 1,
      pageSize: 15,
      total: 0
    }
  },
  methods: {
    // 页码改变的回调, 返回改变后的页码
    changePage (page) {
      this.page = page
      this.init()
    },
    // 切换每页条数时的回调, 返回切换后的每页条数
    changePageSize (size) {
      this.pageSize = size
      this.init()
    }
  }
}
