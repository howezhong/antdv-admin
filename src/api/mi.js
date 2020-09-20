import { post } from '@/utils/axios'

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export const login = data => {
  return post('login', data)
}
