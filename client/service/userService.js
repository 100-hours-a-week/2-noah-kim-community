import { getAuthData } from '../lib/utils/auth.js'
import { APIEndpoints } from './endpoints.js'
import { Fetch } from './Fetch.js'

export const registerUser = async ({ email, password, nickname, imageUrl }) => {
  const ENDPOINT = APIEndpoints.AUTH.REGISTER
  const body = { email, password, nickname, imageUrl }

  const response = await Fetch(ENDPOINT, { body })
  return response
}

export const loginUser = async ({ email, password }) => {
  const ENDPOINT = APIEndpoints.AUTH.LOGIN
  const body = { email, password }

  const response = await Fetch(ENDPOINT, { body })
  return response
}

export const getUser = async () => {
  const { userId, accessToken } = getAuthData()
  const token = accessToken

  const ENDPOINT = APIEndpoints.AUTH.GET_USER

  const response = await Fetch(ENDPOINT, { token })
  return response
}

export const modifyUser = async ({ nickname, imageUrl }) => {
  const { userId, accessToken } = getAuthData()

  const body = { nickname, imageUrl }
  const token = accessToken

  const ENDPOINT = APIEndpoints.AUTH.MODIFY

  const response = await Fetch(ENDPOINT, { body, token })
  return response
}
