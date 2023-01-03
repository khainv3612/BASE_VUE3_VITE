import Cookie from 'js-cookie'

const TokenKey = 'access_token'

export function getToken() {
  return Cookie.getItem(TokenKey)
}

export function setToken(token) {
  return Cookie.setItem(TokenKey, token)
}

export function removeToken() {
  return Cookie.removeItem(TokenKey)
}
