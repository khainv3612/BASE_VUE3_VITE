import { defineStore } from 'pinia'

const appStore = defineStore('notification', {
  state: () => ({
    loading: false,
    pageError: false,
    language: '',
    errorCode: '',
    toast: {
      message: '',
      type: 'success',
      isShow: false,
    },
    notifyError: {
      title: '',
      message: '',
      show: false,
    },
    notifySuccess: {
      title: '',
      message: '',
      show: false,
    },
    notifyWarning: {
      title: '',
      message: '',
      show: false,
    },
    notifyInfo: {
      title: '',
      message: '',
      show: false,
    },
  }),
  getters: {
    getLoading: (state) => state.loading,
    getToast: (state) => state.toast,
    getErrorCode: (state) => state.errorCode,
    getNotifyError: (state) => state.notifyError,
    getNotifySuccess: (state) => state.notifySuccess,
    getNotifyInfo: (state) => state.notifyInfo,
    getNotifyWarning: (state) => state.notifyWarning,
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
    setNotifyError(data) {
      this.notifyError = data
    },
    setNotifySuccess(data) {
      this.notifySuccess = data
    },
    setNotifyInfo(data) {
      this.notifyInfo = data
    },
    setNotifyWarning(data) {
      this.notifyWarning = data
    },
  },
})
export default appStore
