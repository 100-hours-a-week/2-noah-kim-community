import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'

export const registerUser = async ({ email, password, nickname, imageUrl }) => {
  const body = { email, password, nickname, imageUrl }

  const response = await Fetch(APIEndpoints.AUTH.REGISTER, { body })
  return response
}

export const loginUser = async ({ email, password }) => {
  const body = { email, password }

  const response = await Fetch(APIEndpoints.AUTH.LOGIN, { body })
  return response
}
