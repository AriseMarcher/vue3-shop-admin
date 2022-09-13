import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import ngprogress from 'nprogress'
import appLayout from '@/layout/app-layout.vue'
import 'nprogress/nprogress.css'

import productRoutes from './modules/product'
import orderRoutes from './modules/order'
import mediaRoutes from './modules/media'
import permissionRoutes from './modules/permission'

import { store } from '@/store'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: appLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      productRoutes,
      orderRoutes,
      mediaRoutes,
      permissionRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  ngprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: {
        redirect: to.fullPath
      }
    }
  }
})

router.afterEach(() => {
  ngprogress.done()
})

export default router
