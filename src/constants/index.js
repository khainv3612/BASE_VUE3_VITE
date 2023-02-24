import { getImg } from '@/utils/utils'

export const LANGUAGE_DEFAULT = 'en'
export const PUBLIC_LAYOUT = 'default-layout'
export const LAYOUT_AUTH = 'auth-layout'
export const LAYOUT_ERROR = 'error-layout'
export const KEY_CAPTCHA = process.env.KEY_CAPTCHA
export const LENGTH_CODE_OTP = 6
export const OTP_EXPIRE = 2
export const ERROR_PAGE_PATH = '/error-page'
export const INTERVAL_UPDATE_SW = 3600 * 24

export const AUTH_SET_ROLES = 'authentication/setRoles'
export const AUTH_SET_PERMISSIONS = 'authentication/setPermissions'

export const TYPE_LOGIN_OTP = 1
export const TYPE_REGISTER_OTP = 2

export const SVG = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 2px; fill: rgba(0, 0, 0, 0); stroke: #A0A3BD"/>`

export const SVG_COLOR = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 3px; fill: rgba(0, 0, 0, 0); stroke: #FE6E00"/>`

// error code
export const CODE_200 = 200
export const CODE_404 = 404
export const CODE_403 = 403
export const CODE_401 = 401
export const CODE_500 = 500

// type toast
export const TYPE_SUCCESS = 'success'
export const TYPE_ERROR = 'error'
export const TYPE_WARRING = 'warning'
export const TYPE_INFO = 'info'

export const LST_LANGUAGE = [
	{
		id: 1,
		name: 'English',
		lang: 'en',
		icon: getImg('english.svg'),
	},
	{
		id: 2,
		name: 'Tiếng Việt',
		lang: 'vi',
		icon: getImg('vietnam.svg'),
	},
]

export const TIME_SHOW_NOTIFICATION = 3000
