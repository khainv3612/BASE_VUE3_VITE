import Home from '@/views/Home'

export const homeRoutes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
]
