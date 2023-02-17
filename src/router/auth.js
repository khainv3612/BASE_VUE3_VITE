import { LAYOUT_AUTH } from '@/constants'

export const authRoutes = [
	{
		path: '/login',
		name: 'login',
		meta: {
			layout: LAYOUT_AUTH,
		},
		component: () => import('@/views/auth/login'),
		hidden: true,
	},
	{
		path: '/register',
		name: 'register',
		meta: {
			layout: LAYOUT_AUTH,
		},
		component: () => import('@/views/auth/register'),
	},
	{
		path: '/user/reset-password',
		component: () => import('@/views/user/reset-password'),
		name: 'Reset Password',
		meta: {
			layout: LAYOUT_AUTH,
		},
		hidden: true,
	},
]
