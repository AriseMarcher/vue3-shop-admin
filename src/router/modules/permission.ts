import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: '',
  component: RouterView,
  children: [
    {
      path: 'role',
      name: 'permission_role',
      component: () => import('@/views/permission/role/index.vue')
    },
    {
      path: 'admin',
      name: 'permission_admin',
      component: () => import('@/views/permission/admin/index.vue')
    },
    {
      path: 'rule',
      name: 'permission_rule',
      component: () => import('@/views/permission/rule/index.vue')
    }
  ]
}

export default routes
