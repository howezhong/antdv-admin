/**
 * 新开页面
 * @param {String} URL
 * @param {String} name 可选的字符串,其中包括数字、字母和下划线,该字符声明了新窗口的名称,如果有则不在创建一个新窗口,会在已有的窗口上变更
 * @param {String} features 如: '_blank'
 */
export const openNewPage = (URL, name = 1, features) => {
  window.open(URL, name, features)
}

export const hasHttpOrHttps = str => {
  const reg = /^(http|https):///
  return str.match(reg)
}

/**
 * 查找数组中是否存在指定的元素
 * @param {Array} arrs 要查询的数组
 * @param {Object} target 要匹配的对象
 * @param {String} key 要匹配的键名
 * @returns Boolean
 */
export const isExistByArrs = (arrs, target, key = 'name') => {
  if (arrs.length === 0) return false
  return arrs.some(item => item[key] === target[key])
}

/**
 * 设置本地存储
 * @param {String} key 键
 * @param {any} value 值
 */
export const setStore = (key, value) => {
  if (!key || typeof key !== 'string') return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
* 获取本地存储
* @param {String} key 键
*/
export const getStore = key => {
  if (!key || typeof key !== 'string') return
  const val = window.sessionStorage.getItem(key)
  return val && JSON.parse(val)
}

export const getCache = key => {
  if (!key) return
  return window.sessionStorage.getItem(key)
}

/**
* 清空本地存储
* @param {String} key 键
*/
export const clearStore = key => {
  if (!key || typeof key !== 'string') return
  window.sessionStorage.setItem(key, '')
}

/**
* 删除本地存储
* @param {String} key 键
*/
export const removeStore = key => {
  if (!key) return
  if (Array.isArray(key) && key.length !== 0) {
    whileFn(key, res => {
      window.sessionStorage.removeItem(res)
    })
  }
  if (typeof key === 'string') {
    window.sessionStorage.removeItem(key)
  }
}

/**
 * 遍历
 * @param {Array} arr 数组
 * @param {Function} fn 回调函数
 * @param {Number} lens 遍历的限制次数
 */
export const whileFn = (arr, fn, lens = '') => {
  if (!arr.length || !fn) return
  let i = -1
  const len = lens || arr.length
  while (++i < len) {
    const item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * 判断是否是对象
 * @param {Object} arg
 */
export const isObject = (arg) => {
  return Object.prototype.toString.call(arg) === '[object Object]'
}
