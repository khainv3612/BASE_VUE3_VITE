import { defineStore } from 'pinia'
import { asyncRoutes, routes } from '@/router'
import settings from '@/settings'

function hasCodePermission(codeArr, routeItem) {
	if (routeItem.meta && routeItem.meta.code) {
		return codeArr.includes(routeItem.meta.code) || routeItem.hidden
	} else {
		return true
	}
}

function filterRouterByCodeArr(codeArr, asyncRoutes) {
	return new Promise((resolve) => {
		const filterRouter = []
		asyncRoutes.forEach(async (routeItem) => {
			if (hasCodePermission(codeArr, routeItem)) {
				if (routeItem.children) {
					routeItem.children = await filterRouterByCodeArr(
						codeArr,
						routeItem.children
					)
				}
				filterRouter.push(routeItem)
			}
		})
		resolve(filterRouter)
	})
}

function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta?.roles?.includes(role))
	} else {
		return true
	}
}
export function filterAsyncRoutes(routes, roles) {
	const res = []
	routes.forEach((route) => {
		const tmp = { ...route }
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles)
			}
			res.push(tmp)
		}
	})

	return res
}

export const usePermissionStore = defineStore('permission', {
	state: () => {
		return {
			isGetUserInfo: false, // get userInfo
			routes: [],
			addRoutes: [],
		}
	},

	actions: {
		M_routes(route) {
			this.$patch((state) => {
				state.addRoutes = route
				state.routes = routes.concat(route)
			})
		},
		M_isGetUserInfo(data) {
			this.$patch((state) => {
				state.isGetUserInfo = data
			})
		},
		// loc route co role thoa man
		generateRoutes(roles) {
			return new Promise((resolve) => {
				let accessedRoutes
				if (settings.permissionMode === 'roles') {
					// filter by role
					if (roles.includes('admin')) {
						accessedRoutes = asyncRoutes || []
					} else {
						accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
					}
				} else {
					// filter by codeArr
					// req code arr
					let codeArr = localStorage.getItem('codeArr')
					if (codeArr) {
						codeArr = JSON.parse(codeArr)
					} else {
						localStorage.setItem('codeArr', JSON.stringify([1]))
						codeArr = localStorage.getItem('codeArr')
					}
					accessedRoutes = filterRouterByCodeArr(codeArr, asyncRoutes)
				}
				// commit('M_routes', accessedRoutes)
				resolve(accessedRoutes)
			})
		},
	},
})
