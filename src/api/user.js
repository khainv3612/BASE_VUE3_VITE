import request from '@/utils/request'

export function forgotPassword(data) {
	return request({
		url: 'forgot-password/send-email',
		method: 'post',
		data,
	})
}

export function getInfo() {
	return request({
		url: 'auth/me',
		method: 'get',
	})
}

export function changePassword(data) {
	return request({
		url: 'auth/change-password',
		method: 'post',
		data,
	})
}
