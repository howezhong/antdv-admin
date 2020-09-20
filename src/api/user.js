import { get } from '@/utils/axios'

/**
 * 用户列表
 * @param {Number} page 页码, 默认1
 * @param {Number} pageSize 每页数量, 默认15
 */
export const getUserList = (data) => {
  return get('v1.0/users', data)
}
