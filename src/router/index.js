import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/router/auth'
import { homeRoutes } from '@/router/home'
import { errorRoutes } from '@/router/error'
import { commonRoutes } from '@/router/common-demo'
import { LAYOUT_ERROR } from '@/constants'

export const asyncRoutes = [
  {
    path: '/permission',
    alwaysShow: true,
    name: 'Permission',
    redirect: '/',
    meta: {
      title: 'Permission',
      icon: 'lock',
      requiresAuth: true,
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/need-role/admin-eg'),
        name: 'AdminPermission',
        meta: {
          title: 'AdminPermission',
          roles: ['admin'], // or you can only set roles in sub nav
        },
      },
      {
        path: 'mentor',
        component: () => import('@/views/need-role/mentor-eg'),
        name: 'MentorPermission',
        meta: {
          title: 'MentorPermission',
          roles: ['admin', 'mentor'], // or you can only set roles in sub nav
        },
      },
    ],
  },
]

export const routes = [
  ...commonRoutes,
  ...authRoutes,
  ...homeRoutes,
  ...asyncRoutes,
  ...errorRoutes,
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    name: 'NotFound',
    meta: {
      title: 'NotFound',
      layout: LAYOUT_ERROR,
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
]
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

export default router
