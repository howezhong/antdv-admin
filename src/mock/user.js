import qs from 'qs'
import Mock from 'mockjs'
import { pagination } from './tools'

export const getUserList = (query) => {
  const len = query.url.indexOf('?') + 1
  const { page, pageSize } = qs.parse(query.url.slice(len))
  const arrs = Mock.mock({
    'list|50': [
      {
        'id|+1': Number(page) === 1 ? Number(page) : Number(pageSize) * (Number(page) - 1) + 1,
        username: '@protocol',
        nickname: '@cname()',
        'status|1': [0, 1]
      }
    ]
  })
  return {
    status: 200,
    msg: 'success',
    data: {
      list: pagination(query, arrs.list),
      total: arrs.list.length,
      page: Number(page),
      pageSize: Number(pageSize)
    }
  }
}
