import appStore from '~/store/app'
import { trans } from '~/utils/language'

// const loadingStore = appStore()

export function setNotifySuccess(message, title) {
	if (!title) title = trans('noti.success')
	appStore().setNotifySuccess({
		title,
		message,
		show: true,
	})
}

export function setNotifyError(message, title) {
	if (!title) title = trans('noti.error')
	appStore().setNotifyError({
		title,
		message,
		show: true,
	})
}

export function setNotifyInfo(message, title) {
	if (!title) title = trans('noti.note')
	appStore().setNotifyInfo({
		title,
		message,
		show: true,
	})
}

export function setNotifyWarning(message, title) {
	if (!title) title = trans('noti.note')
	appStore().setNotifyWarning({
		title,
		message,
		show: true,
	})
}
