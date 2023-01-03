import axios from 'axios'
import { getLanguage } from '@/utils/language'
import { getToken } from '@/services/authService'
import appStore from '@/store/app'
import router from '@/router'
import { handleServerError } from '@/utils/validateServerError'
import { CODE_200, CODE_401, CODE_403, CODE_500, ERROR_PAGE_PATH } from '@/constants'
import { setNotifyError, setNotifySuccess } from '@/services/notiService'

let reqConfig

const service = axios.create({
  baseURL: process.env.API_BASE,
})
service.interceptors.request.use(
  (config) => {
    config.headers['X-LANG'] = getLanguage() ? getLanguage() : 'vi'
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    if (config.isDownLoadFile) {
      config.responseType = 'blob'
    }
    if (config.isUploadFile) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    reqConfig = config
    if (config.isParams) {
      config.params = config.data
      config.data = {}
    }
    if (config.bfLoading) {
      appStore().setLoading(true)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  async (response) => {
    if (reqConfig.bfLoading) {
      appStore().setLoading(false)
    }
    if (reqConfig.isDownLoadFile) {
      return response
    }
    let res = response.data
    const statusCode = res.status_code
    switch (statusCode) {
      case 200:
        break
      case 422:
        res = {
          ...res, error_response: handleServerError([], res.data),
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
      if (reqConfig.isAlertErrorMsg && statusCode === 200) {
        setNotifySuccess(response.message)
      }
      return res
    } else {
      if (reqConfig.isAlertErrorMsg) {
        setNotifyError(response.message)
      }
      if (statusCode.toString().startsWith('5'))
        appStore().setErrorCode(CODE_500)
      await router.push({ path: ERROR_PAGE_PATH, })
      return Promise.reject(new Error(res.message || 'error'))
    }
  },
  async (error) => {
    if (reqConfig.isAlertErrorMsg) {
      setNotifyError(error.message)
    }
    appStore().setErrorCode(CODE_500)
    await router.push({ path: ERROR_PAGE_PATH, })
    return Promise.reject(error)
  },
)
export function axiosRequest({
  url,
  method,
  data,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  timeout,
  isAlertErrorMsg = true
}) {
  return service({
    url,
    method: method ?? 'get',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? false,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg,
    timeout: timeout ?? 15000
  })
}

export default axiosRequest
