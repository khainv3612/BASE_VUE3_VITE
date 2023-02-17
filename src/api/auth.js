import request from '@/utils/request'
import requestNoAuth from '@/utils/requestNoAuth'

export function login(data) {
	return requestNoAuth({
		url: '/auth/login',
		method: 'post',
		data,
	})
}

export function register(data) {
	return requestNoAuth({
		url: '/auth/register',
		method: 'post',
		data,
	})
}

export function verifyLogin(data) {
	return request({
		url: '/auth/verify-login',
		method: 'post',
		data,
	})
}

export function resendOtp(data) {
	return request({
		url: '/auth/resend-code',
		method: 'post',
		data,
	})
}

export function submitRegister(data) {
	return request({
		url: '/auth/verify-register',
		method: 'post',
		data,
	})
}

export function logout() {
	return request({
		url: 'auth/logout',
		method: 'post',
	})
}

export function checkToken(data) {
	return request({
		url: 'forgot-password/reset/check-token',
		method: 'post',
		data,
	})
}

export function resetPassword(data) {
	return request({
		url: `forgot-password/reset`,
		method: 'post',
		data,
	})
}
