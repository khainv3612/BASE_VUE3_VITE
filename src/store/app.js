import { defineStore } from 'pinia'
import { getLanguage } from '@/utils/language'
import { LANGUAGE_DEFAULT } from '@/constants'
import _ from 'lodash'

const appStore = defineStore('appStore', {
	state: () => ({
		loading: false,
		pageError: false,
		language: getLanguage() || LANGUAGE_DEFAULT,
		errorCode: '',
		toast: {
			message: '',
			type: 'success',
			isShow: false,
		},
		notification: {
			show: false,
			type: '',
			title: '',
			message: '',
		},
	}),
	getters: {
		getLoading: (state) => state.loading,
		getLanguage: (state) => state.language,
		getToast: (state) => state.toast,
		getErrorCode: (state) => state.errorCode,
		getNotification: (state) => state.notification,
	},
	actions: {
		setLoading(data) {
			this.loading = data
		},
		setPageError(data) {
			this.pageError = data
		},
		setErrorCode(data) {
			this.errorCode = data
		},
		setLanguage(data) {
			this.language = data
		},
		setToast(type, message, isShow = true) {
			this.toast = { message, type, isShow }
		},
		setNotification(notification) {
			this.notification = _.cloneDeep(notification)
		},
	},
})
export default appStore
