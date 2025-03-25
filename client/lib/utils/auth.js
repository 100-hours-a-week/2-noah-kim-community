export const getAuthData = () => {
  const authData = JSON.parse(localStorage.getItem('auth'))

  return authData
}
