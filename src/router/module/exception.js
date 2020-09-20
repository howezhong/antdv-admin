export default [
  {
    path: '/403',
    name: 'ex_403',
    meta: {
      hidden: true
    },
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/403.vue')
  }, {
    path: '/500',
    name: 'ex_500',
    meta: {
      hidden: true
    },
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/500.vue')
  }, {
    path: '*',
    name: 'ex_404',
    meta: {
      hidden: true
    },
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue')
  }
]
