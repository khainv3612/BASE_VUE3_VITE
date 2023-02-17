import ErrorPage from '@/views/error-page'
import { ERROR_PAGE_PATH, LAYOUT_ERROR } from '@/constants'

export const errorRoutes = [
	{
		path: ERROR_PAGE_PATH,
		name: 'ErrorPage',
		component: ErrorPage,
		meta: {
			requiresAuth: false,
			layout: LAYOUT_ERROR,
		},
	},
]
