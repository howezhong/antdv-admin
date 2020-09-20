import { LayoutMain } from '@/layouts'

const userRouter = {
  path: '/user',
  name: 'user',
  meta: {
    icon: 'user',
    title: '用户管理'
  },
  component: LayoutMain,
  children: [
    {
      path: 'list',
      name: 'user_list',
      meta: {
        title: '用户列表',
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/User')
    }
  ]
}

export default userRouter
