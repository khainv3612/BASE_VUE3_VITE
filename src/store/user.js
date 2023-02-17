import { forgotPassword, getInfo } from '@/api/user'
import {
	getRoles,
	getToken,
	removeToken,
	setRoles,
	setToken,
} from '@/services/authService'
import router, { asyncRoutes } from '@/router/index'
import { defineStore } from 'pinia'
import httpStatus from 'http-status'
import { usePermissionStore } from '@/store/permission'
import { login, logout } from '@/api/auth'

const resetRouter = () => {
	const asyncRouterNameArr = asyncRoutes.map((mItem) => mItem.name)
	asyncRouterNameArr.forEach((name) => {
		if (router.hasRoute(name)) {
			router.removeRoute(name)
		}
	})
}

const userStore = defineStore('userStore', {
	state: () => ({
		token: getToken(),
		name: '',
		user: {},
		roles: [],
	}),
	actions: {
		setTokenAPI(userInfo) {
			const { data } = userInfo
			this.token = data.access_token
			setToken(this.token)
		},
		M_username(username) {
			this.$patch((state) => {
				state.username = username
			})
		},
		M_roles(roles) {
			if (roles === undefined || roles === null || roles.length === 0) {
				roles = ['user']
			}
			this.$patch((state) => {
				state.roles = roles
			})
		},
		login(userInfo) {
			return new Promise((resolve, reject) => {
				login({
					...userInfo,
				})
					.then((response) => {
						const { data } = response
						setToken(data.access_token)
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			})
		},
		forgotPassword(userInfo) {
			const { email } = userInfo
			return new Promise((resolve, reject) => {
				forgotPassword({
					email,
				})
					.then((response) => {
						resolve(response)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},
		userInfo() {
			return new Promise((resolve, reject) => {
				getInfo()
					.then((response) => {
						if (response.status_code === httpStatus.OK) {
							this.user = response.data
							const rolesArr = getRoles()
							if (rolesArr !== null && rolesArr !== undefined) {
								response.roles = JSON.parse(rolesArr)
							} else {
								if (
									response.roles !== null &&
									response.roles !== undefined
								)
									setRoles(JSON.stringify(response.roles))
							}
							const { roles, username } = response
							this.M_username(username)
							this.M_roles(roles)
						}

						resolve(response)
					})
					.catch((error) => reject(error))
			})
		},
		// user logout
		logout() {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						this.resetState()
						resolve(null)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},

		resetState() {
			return new Promise((resolve) => {
				this.M_username('')
				this.M_roles([])
				removeToken() // must remove  token  first
				resetRouter() // reset the router
				const permissionStore = usePermissionStore()
				permissionStore.M_isGetUserInfo(false)
				resolve(null)
			})
		},
	},
})
export default userStore
