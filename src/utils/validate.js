import { removeFromArr } from '@/utils/utils'

/**
 * Created by khainv.
 */

export function addFieldValidate(ref, ruleFormRef, lstFieldError) {
	ruleFormRef.validateField(ref, (valid) => {
		if (!valid) {
			lstFieldError.push(ref)
		} else {
			lstFieldError = removeFromArr(lstFieldError, ref)
		}
	})
}

export async function checkFieldValidate(ref, ruleFormRef, status) {
	ruleFormRef.validateField(ref, async (valid) => {
		status.valid = valid
		return valid
	})
	console.log(status)
	return status
}

export function resetValidateField(ref, ruleFormRef) {
	ruleFormRef.clearValidate(ref)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const reg = /^(?=.{6,32}$)(?![0-9_])[a-z0-9_]+$/
	return reg.test(str)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
	const reg =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
	return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
	const reg = /^[a-z]+$/
	return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
	const reg = /^[A-Z]+$/
	return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
	const reg = /^[A-Za-z]+$/
	return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
	const reg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
	if (typeof str === 'string' || str instanceof String) {
		return true
	}
	return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
	if (typeof Array.isArray === 'undefined') {
		return Object.prototype.toString.call(arg) === '[object Array]'
	}
	return Array.isArray(arg)
}

export function validPassword(str) {
	const reg =
		/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/
	return reg.test(str)
}

export function validPhone(str) {
	const reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
	return reg.test(str)
}

export function validPhoneNoPrefix(str) {
	const reg = /^([0-9]{9,12})$\b/
	return reg.test(str)
}

export function checkDate(str, day = 0) {
	if (str) {
		return (
			new Date(str).getDate() <
			new Date().setDate(new Date().getDate() + day)
		)
	}
}
