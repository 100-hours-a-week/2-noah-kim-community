export const getAuthData = () => {
  const authData = localStorage.getItem('auth')

  return authData
}
