export const getAuthData = () => {
  const authData = JSON.parse(localStorage.getItem('auth'))

  return authData
}

export const getAccessToken = () => {
  const { userId, accessToken } = getAuthData()
  return accessToken
}
