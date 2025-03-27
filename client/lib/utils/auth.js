export const getAuthData = () => {
  const authData = localStorage.getItem('auth')
  let data
  if (authData) {
    data = JSON.parse(authData)
  }

  return data
}

export const getAccessToken = () => {
  const { userId, accessToken } = getAuthData()
  return accessToken ?? undefined
}

export const removeAuthData = () => {
  localStorage.removeItem('auth')
}
