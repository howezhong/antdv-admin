<template>
  <div>
    <a-table rowKey="id" :columns="columns" :data-source="lists" :loading="loading" bordered size="middle" :pagination="false">
      <template slot="status" slot-scope="text">
        <a-tag v-if="text===1" color="cyan">开启</a-tag>
        <a-tag v-else color="orange">禁用</a-tag>
      </template>
      <template slot="action" slot-scope="record">
        <a-button type="primary" @click="edit(record)">编辑</a-button>
      </template>
    </a-table>
    <Pagination :total="total" @change="changePage" @showSizeChange="changePageSize" />
  </div>
</template>
<script>
import { getUserList } from '@/api/user'
import page from '@/mixins/page'

const columns = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID',
    width: 80,
    align: 'center'
  },
  {
    key: 'username',
    dataIndex: 'username',
    title: '用户帐号',
    align: 'center'
  },
  {
    key: 'nickname',
    dataIndex: 'nickname',
    title: '用户昵称',
    align: 'center'
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: '状态',
    scopedSlots: { customRender: 'status' },
    width: 80,
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
    // fixed: 'right'
  }
]
export default {
  name: 'User',
  mixins: [page],
  components: {
    Pagination: () => import('@@/pagination')
  },
  data () {
    return {
      columns: Object.freeze(columns),
      lists: [],
      loading: false
    }
  },
  methods: {
    edit (query) {},
    init () {
      this.loading = true
      getUserList({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const { status, msg, data } = res
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
