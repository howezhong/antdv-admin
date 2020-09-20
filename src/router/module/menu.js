import { LayoutMain } from '@/layouts'

const menuRouter = {
  path: '/menu',
  name: 'menu',
  meta: {
    title: '菜单管理',
    icon: 'menu'
  },
  component: LayoutMain,
  children: [
    {
      path: 'list',
      name: 'menu_list',
      meta: {
        title: '菜单列表',
        keepAlive: true
      },
      component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/List')
    }
  ]
}

export default menuRouter
