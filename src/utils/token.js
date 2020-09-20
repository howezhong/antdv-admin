import Cookies from 'js-cookie'

/**
 * 存储tokens
 * @param {String} accessToken
 * @param {Number} expires 存储天数
 */
export function setToken (accessToken, expires = 1, SameSite = 'Lax') {
  // 存储tokens tokens只进入cookies，不进入vuex全局管理
  Cookies.set('accessToken', `Bearer ${accessToken}`, { expires, SameSite })
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
export function getToken (tokenKey = 'accessToken') {
  return Cookies.get(tokenKey)
}

/**
 * 移除token
 */
export function removeToken (tokenKey = 'accessToken') {
  Cookies.remove(tokenKey)
}
