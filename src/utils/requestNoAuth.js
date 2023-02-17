import axios from 'axios'
import { getLanguage } from '@/utils/language'
import appStore from '@/store/app'
import router from '@/router'
import { handleServerError } from '@/utils/validateServerError'
import {
	CODE_200,
	CODE_401,
	CODE_403,
	CODE_500,
	ERROR_PAGE_PATH,
	TYPE_SUCCESS,
} from '@/constants'

const service = axios.create({
	baseURL: process.env.API_BASE,
})
service.interceptors.request.use(
	(config) => {
		config.headers['X-LANG'] = getLanguage() ? getLanguage() : 'vi'
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	async (response) => {
		let res = response.data
		const statusCode = res.status_code
		switch (statusCode) {
			case 200:
				break
			case 422:
				res = {
					...res,
					error_response: handleServerError([], res.data),
				}
				appStore().setErrorCode(CODE_200)
				break
			case 403:
				appStore().setErrorCode(CODE_403)
				break
			case 401:
				appStore().setErrorCode(CODE_401)
				break
			case 500:
				appStore().setErrorCode(CODE_500)
				break
			default:
				appStore().setErrorCode(CODE_500)
		}
		if (statusCode === 200 || statusCode === 422 || statusCode === 401) {
			return res
		} else {
			appStore().setToast(TYPE_SUCCESS, response.data.message, true)
			if (statusCode.toString().startsWith('5'))
				appStore().setErrorCode(CODE_500)
			await router.push({ path: ERROR_PAGE_PATH })
			return Promise.reject(new Error(res.message || 'error'))
		}
	},
	async (error) => {
		appStore().setErrorCode(CODE_500)
		await router.push({ path: ERROR_PAGE_PATH })
		return Promise.reject(error)
	}
)

export default service
