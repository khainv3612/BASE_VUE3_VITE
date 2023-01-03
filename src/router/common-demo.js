/**
 * commonRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const commonRoutes = [
  {
    path: '/component-common',
    alwaysShow: true, // will always show the root menu
    name: 'CommonDemo',
    meta: {
      title: 'CommonDemo',
      requiresAuth: true,
    },
    children: [
      {
        path: 'dialog',
        component: () => import('@/components/component-common/Dialog'),
        name: 'DialogCommon',
        meta: {
          title: 'DialogCommon',
        },
      },
      {
        path: 'toast',
        component: () => import('@/components/component-common/button-toast'),
        name: 'ToastCommon',
        meta: {
          title: 'ToastCommon',
        },
      },
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

