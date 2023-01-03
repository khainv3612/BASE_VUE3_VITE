import Cookies from 'js-cookie'
import { checkToken, login, logout, register, resendOtp, resetPassword, submitRegister } from '@/api/auth'
import userStore from '@/store/user'
import { forgotPassword } from '@/api/user'

const TokenKey = 'access_token'
const RolesKey = 'roles'
const Email = 'email_login'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setRoles(roles) {
  return Cookies.set(RolesKey, roles)
}

export function getRoles() {
  return Cookies.get(RolesKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getEmail() {
  return Cookies.get(Email)
}

export function setEmail(email) {
  return Cookies.set(Email, email)
}

export function removeEmail() {
  return Cookies.remove(Email)
}

export async function handleLogin(data) {
  const response = await login(data)
  if (response.status_code === 200) {
    setToken(response.data.access_token)
    await userStore().M_roles(response.data.roles)
  }
  return response
}

export function handleRegister(data) {
  return register(data)
}

export function handleResendOtp(data) {
  return resendOtp(data)
}

export function handleSubmitRegister(data) {
  return submitRegister(data)
}

export async function handleLogout() {
  let result = false
  const response = await logout()
  if (response.status_code === 200) {
    await userStore().resetState().then(() => {
      result = true
    })
      .catch((error) => {
        console.log(error)
      })
  }
  return result
}

export function handleForgotPass(data) {
  return forgotPassword(data)
}

export function checkForgotToken(data) {
  return checkToken(data)
}

export function handleResetPass(data) {
  return resetPassword(data)
}
