import { defineAsyncComponent } from 'vue'

export function registerGlobalComponent(app) {
	app.component(
		'AuthLayout',
		defineAsyncComponent(() => import('@/layouts/auth.vue'))
	)
	app.component(
		'DefaultLayout',
		defineAsyncComponent(() => import('@/layouts/default.vue'))
	)
	app.component(
		'ErrorLayout',
		defineAsyncComponent(() => import('@/layouts/error.vue'))
	)
}
