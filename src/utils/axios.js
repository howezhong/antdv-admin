import axios from 'axios'
import qs from 'qs'
import { notification } from 'ant-design-vue'

const Instance = axios.create({
  method: 'get',
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '//api.picture.com',
  // 请求头信息
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // 设置超时时间
  timeout: 5000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  token: '',
  // 参数
  data: {}
})

Instance.interceptors.request.use(config => {
  // 大小写容错
  config.method = config.method.toLowerCase()
  // step: 参数处理
  // 根据请求方法, 序列化传来的参数, 根据后端需求是否序列化
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  // step: 请求错误时做些事(接口错误、超时等)
  return Promise.reject(error)
})

Instance.interceptors.response.use(res => {
  if (res.status.toString().charAt(0) === '2') {
    return res.data
  }
  return res
}, err => {
  if (!err || !err.response) {
    err.message = '请检查 API 是否异常'
  }
  if (err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权, 请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'https版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  }
  notification.error({
    message: '数据交互有误',
    description: err.message
  })
  return Promise.reject(err)
})

/**
 * get请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
export function get (url, params = {}) {
  return Instance.get(url, { params })
}

/**
 * post请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 * @param {Object} config 请求头, 比如表单提交 headers: { 'Content-Type': 'multipart/form-data' }
 */
export function post (url, params = {}, config = null) {
  return Instance.post(url, params, config)
}
/**
 * put请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
export function put (url, params = {}) {
  return Instance.put(url, params)
}
/**
 * delete请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
export function _delete (url, params = {}) {
  return Instance.delete(url, { params })
}
