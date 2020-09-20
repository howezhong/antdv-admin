import Mock from 'mockjs'
import { login, logout } from './login'
import { getUserList } from './user'
import { getAllMenus } from './menu'

// 配置Ajax请求延时, 可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

Mock.mock(/\/login/, login)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/v1.0\/users/, getUserList)
Mock.mock(/\/v1.0\/menus/, getAllMenus)

export default Mock
