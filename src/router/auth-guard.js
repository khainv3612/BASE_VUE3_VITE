import router from '@/router'
import settings from '../settings'
import { getToken, setToken } from '@/services/authService'
import * as routerService from '@/services/routerService'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'
import userStore from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import appStore from '@/store/app'
import { CODE_200, CODE_403, CODE_404, ERROR_PAGE_PATH } from '@/constants'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']
const authPages = ['/login', '/register', '/logout', '/forgot-pass', '/user/reset-password']

router.beforeEach(async(to, from, next) => {
  if (settings.isNeedNprogress) NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (!settings.isNeedLogin) setToken(settings.tmpToken)
  const hasToken = getToken()

  const userStoreVar = userStore()
  const app = appStore()
  const permissionStore = usePermissionStore()
  if (!to.matched.length) {
    app.setPageError(true)
    app.setErrorCode(CODE_404)
    next(ERROR_PAGE_PATH)
    return
  }
  app.setPageError(false)
  if (hasToken) {
    if (authPages.some((path) => {
      return to.path.startsWith(path)
    })) {
      next({ path: '/' })
    } else {
      const isGetUserInfo = permissionStore.isGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        try {
          let roles = await userStoreVar.userInfo()?.roles || []
          roles = (roles !== null && roles !== undefined && roles.length > 0) ? roles : []
          permissionStore.M_isGetUserInfo(true)
          if (to.fullPath.startsWith(ERROR_PAGE_PATH)) {
            next()
          } else if (routerService.hasPermission(roles, to)) {
            app.setErrorCode(CODE_200)
            next({ ...to, replace: true })
          } else {
            await app.setErrorCode(CODE_403)
            next({ path: ERROR_PAGE_PATH, replace: true })
          }
        } catch (err) {
          await userStoreVar.resetState()
          next(`/login`)
          if (settings.isNeedNprogress) NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1 || !to.matched.some(record => record.meta.requiresAuth)) {
      next()
    } else {
      next(`/login`)
      if (settings.isNeedNprogress) NProgress.done()
    }
  }
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
})
