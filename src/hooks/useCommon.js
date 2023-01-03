import { getToken } from '@/utils/auth'
import moment from 'moment'
import { ElMessageBox } from 'element-plus'
export const useCommonExample = () => {
  const state = reactive({
    totalPage: 0,
    searchForm: {},
    fileList: [],
    chooseFileName: '',
    commonValue: '',
    modalShowTitle: '',
    VITE_APP_IMAGE_URL_PRE: '',
    VITE_APP_BASE_URL: '',
    VITE_APP_BASE_WS_URL: '',
    accessToken: '',
    userBaseInfo: {},
    todayTime: '',
    currentTime: '',
    todayTimeLast: '',
    yesterdayTime: null,
    beforeThreeDateTime: '',
    startEndArr: [],
    dialogTitle: '',
    dialogVisible: false
  })
  state.accessToken = getToken()
  state.todayTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  state.todayTimeLast = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.beforeThreeDateTime = moment().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
  state.yesterdayTime = moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')

  const clearParamsIsNull = (objParam) => {
    const obj = Object.keys(objParam)
    obj.forEach((fItem) => {
      if (objParam[fItem] === '' || objParam[fItem] === null || objParam[fItem] === undefined) delete objParam[fItem]
    })
    return objParam
  }

  const handleChange = (fileList) => {
    state.fileList = fileList
  }

  const sleep = (time) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(null)
      }, time)
    })
  }
  const elConfirm = (title, message) => {
    return ElMessageBox({
      message: message || 'content',
      title: title || 'Title',
      confirmButtonClass: 'button-confirm-confirm',
      cancelButtonClass: 'button-confirm_cancel',
      customClass: 'modal-switch',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
  }

  return {
    clearParamsIsNull,
    handleChange,
    sleep,
    elConfirm,
    ...toRefs(state)
  }
}

export const useCommon = useCommonExample

export default useCommonExample
