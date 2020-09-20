import Vue from 'vue'
import VueRouter from 'vue-router'
import { LayoutMain } from '@/layouts'
import userRouter from './module/user'
import menuRouter from './module/menu'
import exception from './module/exception'
import progress from '@@/progressBar'
import { getToken } from '@/utils/token'

// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/**
 * hidden 菜单栏不展示, Boolean 类型
 * keepAlive 缓存该路由, Boolean 类型, 默认值 false
 * links 外链接, 如: https://www.xxx.cn
 */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'LayoutMain',
      component: LayoutMain,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页',
            icon: 'home',
            keepAlive: true
          },
          component: () => import('@/views/home/Home')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        icon: 'login',
        hidden: true
      },
      component: () => import('@/views/login/Login')
    },
    userRouter,
    menuRouter,
    ...exception
  ]
})

const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  progress.start()
  const token = getToken()
  if (!token) {
    if (to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else {
      next()
    }
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到首页
    })
  } else {
    next()
  }
})

router.afterEach(to => {
  progress.finish()
})

export default router
